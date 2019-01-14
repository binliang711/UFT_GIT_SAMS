
'''''*********************************************************************************************************************************************************************
'ALM PATH: SIT 2019\Quarterly Releases\Release 19.1 \Curam Upgrade\1.Core Existing SAMS Functionalities\Common Intake\CBCI40000_Add Application to a case

'ALM TC - CBCI140001_Add application to an existing IC
'       - CBCI140001_Add application to an existing IC_AltFlow_01 

'Developer: Bin Liang

'Date:November 28, 2018

'Testing Objective:Add application into existing IC successfully

'Preconditions:
'''Client has applied for at least one IC with Open status
'''There wasn't submitted application under the IC

'Postconditions:
'''For the reusability of the automation testing data, tester can dispose submitted application for the next testing.

'New Functions added:
'''fnp_SelectIC_InCasesList (IC_ref_nmber)
'''fnp_AddApplication
'''fnp_SelectClient (person_name)

'Update History:
'''1)Jan 10, 2019
'''The above functions are modified based on the automation coding best practice. 
'''Script is also updated based on the modified functions and coding best practice.

'''''*************************************************************************************************************************************************************************

fl_MainWorkflow

Function fl_MainWorkflow
   Dim temp_val
   Dim curr_record
   Dim rtrn_case_number, case_rfrnc_number
   Dim case_number,apch_indx,wrk_sht
   Dim program_name
   Dim person_name, sps_name
   Dim loop_count
   Dim HHM_FullName
   Dim tab_name
   Dim	prgrm_name
   g_IncomeReportingStatus=true
       
'  '	'-----------------------------------------------------------------------------------------
	fg_Regression_LoadInitialSettings
    '-----------------------------------------------------------------------------------------
  	person_name=PersonalInfo.FirstName & PersonalInfo.MiddleName & PersonalInfo.LastName
  	program_name=CaseDesign.Application
	wrk_sht=CaseDesign.AppTabName
	app_date=PersonalInfo.RegistrationDate
	sps_name=fnp_GetSpouseFirstName & " " & PersonalInfo.LastName
		
	Dim sc_date
	sc_date = fu_CreateRefDate (PersonalInfo.PayRunDate, "FirstDayAnyMonth", 0)
	
''	'================================
	g_StepCounter=0: g_PDC_Number=""
	
	g_BrwsrType="MIE" ' "MIE"
							
'	'''	========================================= START =========================================
	If not fnp_CURAM_Initialize then fl_MainWorkflow=false:exit function	
''
''	'''	'==================================================
'	'''	VALIDATION POINT:   Log in
		result=fvp_StepValidation (1, "")
'	'''	'==================================================

'	'''	'==================================================
    'Clean up workspace
	tab_name=fnp_GetWorkAreaTabName
    fgl_TrackSteps ("1 General - " & tab_name): if not fnp_MainMenuSelect (tab_name) then fl_MainWorkflow=false :Exit Function
	If not fnp_MainWorkflow_CleanUpWorkspace Then fl_MainWorkflow=false :Exit Function
	If not fu_waitTillBrowserReady(10,g_pageTitle) then Wait(2)
'	'''	'==================================================

'	'======================================================
	'Search for person and get IC
	fgl_TrackSteps ("Home Page - Search Person"): If not fl_HomePage_Search  then fl_SearchPerson_PersonalInfo=false:exit function		
	If not fu_waitTillBrowserReady(10,g_pageTitle) then Wait(2)

	fgl_TrackSteps ("Person - Home"): If not fnp_PersonInformation_SelectTabs ("Home") then fl_MainWorkflow=false: exit function
	If not fu_waitTillBrowserReady(10,g_pageTitle) then Wait(2)

	fgl_TrackSteps ("Person - Cases"): If not fnp_PersonInformation_SelectTabs ("Cases") then fl_MainWorkflow=false: exit function
	If not fu_waitTillBrowserReady(10,g_pageTitle) then Wait(2)
 
	fgl_TrackSteps ("Person - Select IC"): If not fnp_SelectIC_InCasesList ("103500","Cases") then fl_MainWorkflow=false: exit function
	If not fu_waitTillBrowserReady(10,g_pageTitle) then Wait(2)

	fgl_TrackSteps ("Person - Close Person Tab"): If not fnp_TopLevelTabStrip_CloseTabByPartialDescription (PersonalInfo.FirstName) then fl_MainWorkflow=false:exit function	
	If not fu_waitTillBrowserReady(10,g_pageTitle) then Wait(2)
'    '======================================================

'''    '======================================================
'''    'Navigate to applications section   
'    fgl_TrackSteps ("IC - Case Details"): If not fnp_IntegratedCase_SelectTabs ("Case Details") then fl_MainWorkflow=false:exit function	
'	If not fu_waitTillBrowserReady(10,g_pageTitle) then Wait(2)
'
'    fgl_TrackSteps ("IC - Applications"): If not fnp_LeftDrillDown_MenuSelectItem("Applications") then fl_MainWorkflow=false:exit function	
'	If not fu_waitTillBrowserReady(10,g_pageTitle) then Wait(2)
'''    '======================================================
  
    
    

''	'=======================================================
''	VALIDATION POINT:   Log out
	g_InternalStepValidation=2
'''	'=======================================================

	fl_MainWorkflow=fl_MainWorkflow_Finalize

	fg_Regression_UnloadInitialSettings
	
'	'''	========================================= End =========================================
End Function
