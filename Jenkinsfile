@Library('atlas-pipeline-library@2.11.0') _

// DateTimeFormatter er forbudt så vi må klare oss med String#format(String, Object...)
// Denne dangler utenfor blokken som pipelinen definerer, så den er global i relasjon til pipeline
// sitt navnerom.
def time = java.time.LocalDateTime.now()
def RELEASE_VERSJON = String.format("%s.%s.%s",
									time.getYear(),
									time.getDayOfYear(),
									time.getHour()   * 60 * 60 +
									time.getMinute() * 60 +
									time.getSecond())
def SNAPSHOT_VERSJON = "${RELEASE_VERSJON}-SNAPSHOT"
time = null

pipeline {
	agent { label 'nodejs-18' }

	options {
		timeout(time: 180, unit: 'MINUTES')
	}

	environment {
		CI = 'true'
		HTTP_PROXY = 'http://proxy-server.vegvesen.no:8080'
		HTTPS_PROXY = 'http://proxy-server.vegvesen.no:8080'
		NO_PROXY = 'artrepo.vegvesen.no'

		ARTREPO_CREDENTIALS_ID = 'ARTREPO_CREDS'
		ATLAS_CREDENTIALS_ID = 'ATLAS_CREDS'
		IKTLOSNING = 'vegfoto'

		GENERATE_SOURCEMAP = 'false'

		// skip preflight check by create-react-app
		// due to minor version differences in babel-loader,
		// which is also depended on by storybook
		SKIP_PREFLIGHT_CHECK = true
	}

	stages {
		stage('npm ci') {
			steps {
				sh 'echo "node $(node --version)"'
				sh 'echo "npm v$(npm --version)"'

				sh 'npm -dd ci'

				// make sure scripts are executable
				sh "chmod +x scripts/*.mjs"
			}
		}

		stage('eslint (validate)') {
			steps {
				sh 'npm run eslint'
				// sh 'npm run prettier:check'
				sh 'npm run typescript'
				sh 'npm run build'
			}
		}

		/*stage('npm test') {

			steps {
				sh 'npm test'
			}
		}*/

		stage('Deploy UTV') {
			when {
				branch 'development'
			}

			steps {
				echo "build+deploy ${SNAPSHOT_VERSJON} to UTV"

				atlasRunWithCredentials({
					sh "node --experimental-top-level-await ./scripts/create-app-image.mjs snapshots ${SNAPSHOT_VERSJON}"
				})

				// Set image version in atlas config
                atlasSetImageTag (version: "${SNAPSHOT_VERSJON}", file: 'atlas/vegbilder.opplasting-web.json')
				atlasPerformBlueGreenDeploy deploy: 'vegbilder-opplasting-web', environment: 'stm-1'
			}
		}

		stage('Release ATM') {
			when {
				branch 'development'
				beforeInput true
				not { changeRequest() }

			}
			options {
				timeout(time: 15, unit: 'MINUTES')
			}
			input {
				message 'Lag release build?'
				submitter 'atlas=vegfoto_skriv'
				submitterParameter "approvedByUser"
				parameters {
					password name: 'PASSWORD', description: 'Passord (for å kunne pushe til artifactory)'
				}
			}
			steps {
				script {
					env.ATLAS_RESPONSIBLE_USER = approvedByUser
					env.PASSWORD = PASSWORD
					env.VERSJON = RELEASE_VERSJON

				}

				sh "node --experimental-top-level-await ./scripts/create-app-image.mjs release ${VERSJON}"

				// Set image version in atlas config
				atlasSetImageTag (version: "${RELEASE_VERSJON}", file: 'atlas/tsinsp-web.json')

				sh 'node --experimental-top-level-await ./scripts/set-atlas-version.mjs ${VERSJON}'
				atlasPerformBlueGreenDeploy deploy: 'vegbilder-opplasting-web', environment: 'atm-1'
			}
		}

		stage('Deploy PROD') {
			when {
				branch 'development'
				beforeInput true
				not { changeRequest() }
			}
			options {
				timeout(time: 15, unit: 'MINUTES')
			}
			input {
				message 'Deploy PROD?'
				submitter 'atlas=tsinsp_skriv'
				submitterParameter "approvedByUser"
				parameters {}
			}
			steps {
				script { env.ATLAS_RESPONSIBLE_USER = approvedByUser }
				// Set image version in atlas config
				atlasSetImageTag (version: "${RELEASE_VERSJON}", file: 'atlas/vegbilder-opplasting-web.json')
				atlasPerformBlueGreenDeploy deploy: 'vegbilder-opplasting-web', environment: 'prod-1'
			}

			post {
				success {
					slackSend(color: 'good', channel: '#tsinsp', message: """
                    :rocket: Vegbilder-opplasting frontend ${VERSJON} er deployet til PROD.
""")
				}
			}
		}

		stage('Deploy storybook UTV') {
			when {
				branch 'development'
			}

			steps {
				atlasRunWithCredentials({
					sh "node --experimental-top-level-await ./scripts/atlas-deploy-storybook.mjs ${SNAPSHOT_VERSJON}"
				})
			}
		}
	}
	post {
		always {
			atlasCleanConfig()
		}
	}
}
