# EDC Frontend - DEMO

**Disclaimer: This application is created in super short time frame so we have not followed all the standards of code. We are not recommnding to use this app direcly in production system or even DEV for that matter. This is only for DEMO purposes.**

# Features of the app

We have running 4 EDC connector on our server.
This is simple UI to explain how data will transfer from one connector to other connector.
NOTE : Currently we are not use any authentication for login as connector.

Login as EDC : This is contain static list from drop down you can select EDC whom you are.
Once you select EDC, you can communicate as provider or consumer.
UI having 2 buttons for connector 
	
1. DATA PROVIDER
		- Create asset with some meta information.
		- Add policyId and contractdefinition for the asset.
		- You can find the created asset list on the UI.
2. DATA CONSUMER 
		- Select EDC whom we want to communicate.
		- Now fetch the catalogs, it will return only 20 catalogs for now.
		- Start negotiation and you can find contract aggrement id.
		- Init transfer process (For now not working.)

Below section you find EDC Data,
> This section is depend on the API wrapper which will communicate with EDC.
- FOR smartsense and BASF
	- Create Data
        > it will create data for the organisation.
        > Once data will created you can see the list on the sent section with CREATED status.
    - Transfer Data
        > This button indicate that  this data we want to transfer with other edc.
        > select EDC and submit now, it will transfer data from one edc to other edc.
        > now the status will update as SENT.
        > You can find the data into the received section on the selected edc connector. 
- FOR EDC-3 and EDC-4
    - Create Data
        > Select part information(Basically this is for the fetch EDC url) and add some description that we want to transfer.
    - You can find the data into the received section on the selected edc connector. 

</details>
