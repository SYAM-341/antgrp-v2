pipeline{
    agent any
    parameters{
        string(defaultValue: "", description: "Deployment Name?", name: "deployName")
        choice(choices:["EU-WEST-1", "US-EAST-1", "US-WEST-2"], description: "Which region to deploy in", name: "deployRegion")
        booleanParam(defaultValue: false, description: "CONFIRM DEPLOYMENT?", name: "confirmDeploy")
    }

    stages{
        stage("Deploy"){
            steps{
                echo "String set to: ${deployName} \n"
                echo "Choice set to: ${deployRegion} \n"
                echo "Boolean set to: ${confirmDeploy} \n"
            }
        }

    }
}
