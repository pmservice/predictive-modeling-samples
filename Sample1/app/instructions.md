--------------------------------------------
Welcome to the Sample1 Node.js app for the SPSS Predictive Modeling service on Bluemix!

Node.js app runs on a server-side high performance, highly scalable, event-driven environment with non-blocking I/O that is programmed with the JavaScript programming language.
--------------------------------------------

1. [Install the cf command-line tool](https://www.stage1.ng.bluemix.net/docs/#starters/BuildingWeb.html#install_cf).

2. [Download the starter application package](https://ace.stage1.ng.bluemix.net:443/rest/../rest/apps/d17f3221-7e1b-4a1b-ae07-0aa07772743b/starter-download).

3. Extract the package and `cd` to it.

4. Connect to Bluemix:

		cf api https://api.stage1.ng.bluemix.net

5. Log into Bluemix:

		cf login -u <your IBM ID and password>
		cf target -o <your org> -s <your space>

6. Deploy your app (adjust the 'host' in manifest.yml first):

		cf push Sample1

7. Provision an instance of the SPSS Predictive Modeling service

9. Bind this service instance to your application

10. Deploy the Drug1n.str SPSS Modeler file on this instance of the PM service

11. Access your app, launch from Dashboard for space you pushed to...

