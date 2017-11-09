(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('mailFormatsModel', factory);

    factory.$inject = ['mailFormatsService'];

    function factory(mailFormatsService) {

        var model = {};

        model.sideMenuLinksArr = [
            { label: 'Email Verification', typeofDiv: 'emailVerify' },
            { label: 'Forgot Password', typeofDiv: 'forgot' },
            { label: 'Basic Profile', typeofDiv: 'basicProfile' },
            { label: 'Partial view profile for unpaid', typeofDiv: 'unpaidpartialProfile' },
            { label: 'Partial view profile for paid', typeofDiv: 'paidpartialProfile' },
            { label: 'View full profile for unpaid', typeofDiv: 'unPaidFullViewProfile' },
            { label: 'View fulll profile for paid', typeofDiv: 'PaidFullViewProfile' },
            { label: 'Matchfollowup Resend', typeofDiv: 'MatchfollowupResendMail' },
            { label: 'Matchfollowup Interest', typeofDiv: 'Matchfollowupinterest' },
            { label: 'Matchfollowup Not Interest', typeofDiv: 'MatchfollowupNotinterst' },
            { label: 'Customer Bookmark', typeofDiv: 'bookmark' },
            { label: 'Customer Message sending', typeofDiv: 'custMessage' },
            { label: 'No photos', typeofDiv: 'noPhotos' }
        ];


        model.paidPartialviewfull = [
            [{ "Row": 1, "TableName": "Headings", "Headings": "My Basic Details", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 2, "TableName": "Headings", "Headings": "My Education & Profession", "classname": "" }, { "Row": 3, "TableName": "Headings", "Headings": "My Location", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 4, "TableName": "Headings", "Headings": "My Contact & Email", "classname": "" }, { "Row": 5, "TableName": "Headings", "Headings": "About My Family", "classname": "" }, { "Row": 7, "TableName": "Headings", "Headings": "My Brothers and Sisters", "classname": "" }, { "Row": 8, "TableName": "Headings", "Headings": "My Father side & Mother side Family", "classname": "" }, { "Row": 9, "TableName": "Headings", "Headings": "My Mother side Family", "classname": "" }, { "Row": 10, "TableName": "Headings", "Headings": "My Reference Details", "classname": "" }, { "Row": 11, "TableName": "Headings", "Headings": "Profile Relation Ship Manager", "classname": "" }],
            [{ "TableName": "My Basic Details", "columnname": "SURNAME", "value": "SUNKARA" }, { "TableName": "My Basic Details", "columnname": "Marital Status", "value": "Divorce" }, { "TableName": "My Basic Details", "columnname": "Height", "value": "5'10 in - 177 cms" }, { "TableName": "My Basic Details", "columnname": "Caste", "value": "Kamma" }, { "TableName": "My Basic Details", "columnname": "Religion", "value": "Hindu" }, { "TableName": "My Basic Details", "columnname": "Mother Tongue", "value": "Telugu" }, { "TableName": "My Basic Details", "columnname": "Age", "value": "26-Sep-1985 (32)" }, { "TableName": "My Basic Details", "columnname": "Time of Birth (Hrs)", "value": "22:05" }, { "TableName": "My Basic Details", "columnname": "Place of Birth", "value": "Hyderabad" }, { "TableName": "My Basic Details", "columnname": "Star(Padam)", "value": "Sathabisham (3)" }, { "TableName": "My Basic Details", "columnname": "Raasi", "value": "Kumbha" }, { "TableName": "My Basic Details", "columnname": "Lagnam", "value": "Not Given" }, { "TableName": "My Basic Details", "columnname": "Gothram", "value": "VIPPARLA" }, { "TableName": "My Basic Details", "columnname": "Complexion", "value": "Fair" }],
            [{ "TableName": "My Location", "columnname": "Country Living", "value": "India" }, { "TableName": "My Location", "columnname": "State Living", "value": "Telangana" }],
            [{ "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CA (Chartered Accountant) :   , Completed -  2011" }, { "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BCom (Honours) :   INDIAN INSTITUTE OF MANAGEMENT COMMERCE" }, { "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Intermediate (MPC) :  NALANDA JR COLLEGE" }, { "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSC :   KRISHNAVENI SCHOOL" }, { "TableName": null, "ColumnName": "Education", "Value": "<font color=\"red\">Note: Institution names and places are available for paid members</font><\\br>" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Profession", "Value": "Partner, Hyderabad, TS. working since - 01-Jan-2013" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Company Name", "Value": "Available" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Profession Details", "Value": "own ca firm, groom income 12 to 15 lakhs per annum" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Monthly Income", "Value": "Rs - 100000 /- " }],
            [{ "TableName": "About My Family", "columnname": "Father Name", "value": "SURYA PRAKASA RAO, BCOM,LLB,FCA" }, { "TableName": "About My Family", "columnname": "Father Profession", "value": "Business" }, { "TableName": "About My Family", "columnname": "Father Father Name", "value": "MADUSUDHANA RAO (LATE) LAND LORD" }, { "TableName": "About My Family", "columnname": "Father Native District", "value": "krishna, AP<br><br>" }, { "TableName": "About My Family", "columnname": "Mother Name", "value": "KUSUMA KUMARI, SSC" }, { "TableName": "About My Family", "columnname": "Mother Father Name", "value": "SATYANARAYANA (80 YEARS) , AGRICULTURE." }, { "TableName": "About My Family", "columnname": "Mother Native District", "value": "khammam, TS<br><br>" }, { "TableName": "About My Family", "columnname": "Property", "value": "Share - 1000 Lakhs " }, { "TableName": "About My Family", "columnname": "No of Siblings", "value": "No Of Brothers: 0    No Of Sisters: 1" }],
            [{ "TableName": "About", "Aboutyourself": "", "FromReleationName": "Vadlamudi", "Fromrelationcontact": "91 - 9177684466", "FromreleationEmail": "info@telugumarriages.com", "RelationShipManager": "Naveena yalamanchi", "ContactDetails": "91 - 9340099993", "EmailID": "ynaveena@hotmail.com" }],
            [{ "TableName": "Primary", "ProfileID": "211143826", "Cust_ID": 114382, "NAME": "SUNKARA", "GenderID": 1, "Age": 32, "ProfilePhotoName": "Img1.jpg", "PhotoName_Cust": 1, "Height": "5'10 in - 177 cms", "ReligionName": "Hindu", "Caste": "Kamma", "Education": "Finance - ICWAI/CA/CS", "StateName": ", TS", "HoroscopeImage": "src/images/view_horoscope_image.jpg", "ExpressInterestFlag": null, "ExpressInterestLinkFlag": null, "EmpFollowTicket": null, "ibookmark": 0, "No of Siblings": null, "ApplicationPhotoPath": "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_114382_Images/Img1_Images/211143826_ApplicationPhoto.jpg", "RelationshipManger": "Mr.Dummy Manager", "RelationshipManagerNumber": "91-9392696969" }],
            [{ "TableName": "My Contact & Email", "columnname": "Address", "value": "Available" }, { "TableName": "My Contact & Email", "columnname": "Phone", "value": "Available" }, { "TableName": "My Contact & Email", "columnname": "Email", "value": "Available" }],
            [{ "TableName": "My Brothers and Sisters", "ColumnName": "Sister (Elder)", "Value": "Available" }],
            [{ "TableName": "My Father side & Mother side Family", "ColumnName": "Father Brother (Y)", "Value": "Available" }, { "TableName": "My Father side & Mother side Family", "ColumnName": "Father Sister (Y)", "Value": "Available" }],
            [{ "TableName": "My Mother side Family", "ColumnName": "MotherBrother(E)", "Value": "Available" }],
            [{ "TableName": "Relation Ship Manager", "columnname": "RelationShipManager", "value": "Srilakshmi Vadlamudi ( 08:00 to 19:00 ) " }, { "TableName": "Relation Ship Manager", "columnname": "Contact Details", "value": "91 - 9177684466" }, { "TableName": "Relation Ship Manager", "columnname": "EmailID", "value": "info@telugumarriages.com" }, { "TableName": "Relation Ship Manager", "columnname": "Note", "value": "<b><font color=\"red\">\"Available\" Information will be provided Once proceeded by both the Bride & Groom</font></b>" }]
        ];


        model.arrayviewprofile = [
            [{ "Row": 1, "TableName": "Headings", "Headings": "My Basic Details", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 2, "TableName": "Headings", "Headings": "My Profession & Education Information", "classname": "" }, { "Row": 3, "TableName": "Headings", "Headings": "My Location Information", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 4, "TableName": "Headings", "Headings": "My Contact & Email", "classname": "" }, { "Row": 5, "TableName": "Headings", "Headings": "About My Family", "classname": "" }, { "Row": 7, "TableName": "Headings", "Headings": "My Brothers and Sisters", "classname": "" }, { "Row": 8, "TableName": "Headings", "Headings": "My Father side & Mother side Family", "classname": "" }, { "Row": 9, "TableName": "Headings", "Headings": "My Mother side Family", "classname": "" }, { "Row": 10, "TableName": "Headings", "Headings": "My Reference Details", "classname": "" }, { "Row": 11, "TableName": "Headings", "Headings": "Profile Relation Ship Manager", "classname": "" }],
            [{ "TableName": "My Basic Details", "columnname": "NAME", "value": "SRIHARSHA SUNKARA" }, { "TableName": "My Basic Details", "columnname": "Marital Status", "value": "Divorce" }, { "TableName": "My Basic Details", "columnname": "Height", "value": "5'10 in - 177 cms" }, { "TableName": "My Basic Details", "columnname": "Caste", "value": "Kamma" }, { "TableName": "My Basic Details", "columnname": "Religion", "value": "Hindu" }, { "TableName": "My Basic Details", "columnname": "Mother Tongue", "value": "Telugu" }, { "TableName": "My Basic Details", "columnname": "Age", "value": "26-Sep-1985 (32)" }, { "TableName": "My Basic Details", "columnname": "Time of Birth (Hrs)", "value": "22:05" }, { "TableName": "My Basic Details", "columnname": "Place of Birth", "value": "Hyderabad" }, { "TableName": "My Basic Details", "columnname": "Star(Padam)", "value": "Sathabisham (3)" }, { "TableName": "My Basic Details", "columnname": "Raasi", "value": "Kumbha" }, { "TableName": "My Basic Details", "columnname": "Gothram", "value": "VIPPARLA" }, { "TableName": "My Basic Details", "columnname": "Lagnam", "value": "Not Given" }, { "TableName": "My Basic Details", "columnname": "Complexion", "value": "Fair" }],
            [{ "TableName": "My Location Information", "columnname": "Country Living", "value": "India" }, { "TableName": "My Location Information", "columnname": "State Living", "value": "Telangana" }, { "TableName": "My Location Information", "columnname": "City Living", "value": "Hyderabad" }],
            [{ "TableName": "My Profession & Education Information", "columnname": "Profession", "value": "Partner, S Surya Prakasa Rao  And Co, Hyderabad, TS - 01-Jan-2013" }, { "TableName": "My Profession & Education Information", "columnname": "Monthly Income", "value": "Rs - 100000" }, { "TableName": "My Profession & Education Information", "columnname": "Profession Details", "value": "own ca firm, groom income 12 to 15 lakhs per annum" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CA (Chartered Accountant) :  ,  2011" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BCom (Honours) :  INDIAN INSTITUTE OF MANAGEMENT COMMERCE, LAKDIKAPOOL,  TS" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Intermediate (MPC) : NALANDA JR COLLEGE, Hyderabad,  TS" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSC :  KRISHNAVENI SCHOOL, Hyderabad,  TS" }],
            [{ "TableName": "About My Family", "columnname": "Father Name", "value": "SURYA PRAKASA RAO, BCOM,LLB,FCA , Business , HYDERABAD" }, { "TableName": "About My Family", "columnname": "Father_CompanyName", "value": "Contact to RM" }, { "TableName": "About My Family", "columnname": "Father Contact Details", "value": "<b>Phone : </b><img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Email ID : </b> <img src=\"http://kaakateeya.com/dist/Images/ico_mail.png\" />" }, { "TableName": "About My Family", "columnname": "Father Father Name &amp; Native", "value": "MADUSUDHANA RAO (LATE) LAND LORD<img src=\"http://kaakateeya.com/dist/images/icon.land.jpg\" /> & <img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Native: </b>PONUKUMADU---> KAKARLA, NEAR  TIRUVURU, Krishna" }, { "TableName": "About My Family", "columnname": "Mother Name", "value": "KUSUMA KUMARI, SSC   " }, { "TableName": "About My Family", "columnname": "Mother Contact Details", "value": "<b>Phone : </b><img src=\"http://kaakateeya.com/dist/images/icon.land.jpg\" /> & <img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Email ID : </b><img src=\"http://kaakateeya.com/dist/images/ico_mail.png\" />" }, { "TableName": "About My Family", "columnname": "Mother Father Name &amp; Native", "value": "DUGGIRALA SATYANARAYANA (80 YEARS) , AGRICULTURE.<img src=\"http://kaakateeya.com/dist/images/icon.land.jpg\" /> & <img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /> <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Native: </b>VEMSUR , NEAR SATTUPALLI, Khammam, TS" }, { "TableName": "About My Family", "columnname": "Property", "value": "Share - 1000 Lakhs " }, { "TableName": "About My Family", "columnname": "Property Details", "value": "BUILDING AND LANDED PROPERTY + AGRL LANDS" }, { "TableName": "About My Family", "columnname": "No of Siblings", "value": "No Of Brothers: 0    No Of Sisters: 1" }],
            [{ "TableName": "About", "Aboutyourself": "", "FromReleationName": "Vadlamudi", "Fromrelationcontact": "91 - 9177684466", "FromreleationEmail": "info@telugumarriages.com", "RelationShipManager": "Naveena yalamanchi", "ContactDetails": "91 - 9340099993", "EmailID": "ynaveena@hotmail.com" }],
            [{ "TableName": "Primary", "ProfileID": "211143826", "Cust_ID": 114382, "NAME": "SUNKARA SRIHARSHA", "GenderID": 1, "Age": 32, "ProfilePhotoName": "Img1.jpg", "PhotoName_Cust": 1, "Height": "5'10 in - 177 cms", "ReligionName": "Hindu", "Caste": "Kamma", "Education": "Finance - ICWAI/CA/CS", "StateName": ", TS", "HoroscopeImage": "src/images/view_horoscope_image.jpg", "ExpressInterestFlag": null, "ExpressInterestLinkFlag": null, "EmpFollowTicket": null, "ibookmark": 0, "No of Siblings": null, "ApplicationPhotoPath": "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_114382_Images/Img1_Images/211143826_ApplicationPhoto.jpg" }],
            [{ "TableName": "My Contact & Email", "columnname": "Address", "value": "Available" }, { "TableName": "My Contact & Email", "columnname": "Contact", "value": "<img src=\"http://kaakateeya.com/dist/images/icon.land.jpg\" />  <img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /><img src=\"http://kaakateeya.com/dist/Images/ico_mail.png\" />" }],
            [{ "TableName": "My Brothers and Sisters", "ColumnName": "Sister (Elder)", "Value": "MADHURI , BTECH,  MS( Healthcare Management ), Private Job, DELL, AUSTIN TEXAS USA &nbsp;&nbsp;<b>W/O:</b> CHANDRASEKHAR  , MS, Private Job, AUSTIN TEXAS USA, <b>S/O: </b>MOVVA GOPINATH (LATE),BSC, <b>Native: </b>RAMACHANDRAPURM, Guntur, A.P " }],
            [{ "TableName": "My Father side & Mother side Family", "ColumnName": "Father Brother (Y)", "Value": "KRISHNAMOHAN, B.Com, EX SARPANCH (25 YEARS), KAKARLA, NEAR TIRUVURU KRIISHNA DT " }, { "TableName": "My Father side & Mother side Family", "ColumnName": "Father Sister (Y)", "Value": " SURYAKUMARI, B.A&nbsp;&nbsp;<b>W/O:</b>  KANDULA VEERAYYA  CHOWDARY,  MSc, RETD MANAGER, R.B.I., HYDERABAD., <b>Native: </b> GANESHUNIPADU NEAR PIDUGURALA, Guntur, AP " }, { "TableName": "My Father side & Mother side Family", "ColumnName": "Father Sister (Y)", "Value": "RATNAKUMARI, B.Com&nbsp;&nbsp;<b>W/O:</b> KOLLI DASARADHARAMAIAH , BCom , CLASS I CONTRACTORS, VISAKHAPATNAM, <b>Native: </b>BHUSHANAGULLA , Krishna, AP , <b>Current Location: </b>SETTLED VISAKHAPATNAM" }],
            [{ "TableName": "My Mother side Family", "ColumnName": "MotherBrother(E)", "Value": "ASHOK KUMAR,  BUSINESS IN SATTUPALLI, KHAMMAM DIST " }],
            [{ "TableName": "My Reference Details", "columnname": "My Reference Details", "value": "KODALI RAMBABU<img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" />, <b>Current Location: </b>HYDERABAD,  <b>Native: </b>ELAMARRU, Krishna,  AP" }],
            [{ "TableName": "Profile Relation Ship Manager", "columnname": "RelationShipManager", "value": "Srilakshmi Vadlamudi ( 08:00 to 19:00 ) " }, { "TableName": "Profile Relation Ship Manager", "columnname": "Contact Details", "value": "91 - 9177684466" }, { "TableName": "Profile Relation Ship Manager", "columnname": "EmailID", "value": "info@telugumarriages.com" }]
        ];

        model.unPaidPartialviewfull = [
            [{ "Row": 1, "TableName": "Headings", "Headings": "My Basic Details", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 2, "TableName": "Headings", "Headings": "My Education & Profession", "classname": "" }, { "Row": 3, "TableName": "Headings", "Headings": "My Location", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 4, "TableName": "Headings", "Headings": "My Contact & Email", "classname": "" }, { "Row": 5, "TableName": "Headings", "Headings": "About My Family", "classname": "" }, { "Row": 7, "TableName": "Headings", "Headings": "My Brothers and Sisters", "classname": "" }, { "Row": 8, "TableName": "Headings", "Headings": "My Father side & Mother side Family", "classname": "" }, { "Row": 9, "TableName": "Headings", "Headings": "My Mother side Family", "classname": "" }, { "Row": 10, "TableName": "Headings", "Headings": "My Reference Details", "classname": "" }, { "Row": 11, "TableName": "Headings", "Headings": "Profile Relation Ship Manager", "classname": "" }],
            [{ "TableName": "My Basic Details", "columnname": "SURNAME", "value": "SUNKARA" }, { "TableName": "My Basic Details", "columnname": "Marital Status", "value": "Divorce" }, { "TableName": "My Basic Details", "columnname": "Height", "value": "5'10 in - 177 cms" }, { "TableName": "My Basic Details", "columnname": "Caste", "value": "Kamma" }, { "TableName": "My Basic Details", "columnname": "Religion", "value": "Hindu" }, { "TableName": "My Basic Details", "columnname": "Mother Tongue", "value": "Telugu" }, { "TableName": "My Basic Details", "columnname": "Age", "value": "26-Sep-1985 (32)" }, { "TableName": "My Basic Details", "columnname": "Time of Birth (Hrs)", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Basic Details", "columnname": "Place of Birth", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Basic Details", "columnname": "Star(Padam)", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Basic Details", "columnname": "Raasi", "value": "Kumbha" }, { "TableName": "My Basic Details", "columnname": "Lagnam", "value": "Not Given" }, { "TableName": "My Basic Details", "columnname": "Gothram", "value": "VIPPARLA" }, { "TableName": "My Basic Details", "columnname": "Complexion", "value": "Fair" }],
            [{ "TableName": "My Location", "columnname": "Country Living", "value": "India" }, { "TableName": "My Location", "columnname": "State Living", "value": "Telangana" }],
            [{ "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CA (Chartered Accountant) : <font color=\"red\">For Paid Member</font>" }, { "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BCom (Honours) : <font color=\"red\">For Paid Member</font>" }, { "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Intermediate (MPC) : <font color=\"red\">For Paid Member</font>" }, { "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSC : <font color=\"red\">For Paid Member</font>" }, { "TableName": null, "ColumnName": "Education", "Value": "<font color=\"red\">Note: Institution names and places are available for paid members</font><\\br>" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Profession", "Value": "Partner, Hyderabad, TS. working since - 01-Jan-2013" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Company Name", "Value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Profession Details", "Value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Monthly Income", "Value": "<font color=\"red\">For Paid Member</font>" }],
            [{ "TableName": "About My Family", "columnname": "Father Name", "value": "SURYA PRAKASA RAO, BCOM,LLB,FCA" }, { "TableName": "About My Family", "columnname": "Father Profession", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "About My Family", "columnname": "Father Father Name", "value": "MADUSUDHANA RAO (LATE) LAND LORD" }, { "TableName": "About My Family", "columnname": "Father Native District", "value": "<font color=\"red\">For Paid Member</font><br><br>" }, { "TableName": "About My Family", "columnname": "Mother Name", "value": "KUSUMA KUMARI, SSC" }, { "TableName": "About My Family", "columnname": "Mother Father Name", "value": "SATYANARAYANA (80 YEARS) , AGRICULTURE." }, { "TableName": "About My Family", "columnname": "Mother Native District", "value": "<font color=\"red\">For Paid Member</font><br><br>" }, { "TableName": "About My Family", "columnname": "Property", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "About My Family", "columnname": "No of Siblings", "value": "No Of Brothers: 0    No Of Sisters: 1" }],
            [{ "TableName": "About", "Aboutyourself": "", "FromReleationName": "Vadlamudi", "Fromrelationcontact": "91 - 9177684466", "FromreleationEmail": "info@telugumarriages.com", "RelationShipManager": null, "ContactDetails": null, "EmailID": null }],
            [{ "TableName": "Primary", "ProfileID": "211143826", "Cust_ID": 114382, "NAME": "SUNKARA", "GenderID": 1, "Age": 32, "ProfilePhotoName": "Img1.jpg", "PhotoName_Cust": 1, "Height": "5'10 in - 177 cms", "ReligionName": "Hindu", "Caste": "Kamma", "Education": "Finance - ICWAI/CA/CS", "StateName": ", TS", "HoroscopeImage": "src/images/view_horoscope_image.jpg", "ExpressInterestFlag": null, "ExpressInterestLinkFlag": null, "EmpFollowTicket": null, "ibookmark": 0, "No of Siblings": null, "ApplicationPhotoPath": "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_114382_Images/Img1_Images/211143826_ApplicationPhoto.jpg", "RelationshipManger": "Mr.Dummy Manager", "RelationshipManagerNumber": "91-9392696969" }],
            [{ "TableName": "My Contact & Email", "columnname": "Address", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Contact & Email", "columnname": "Phone", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Contact & Email", "columnname": "Email", "value": "<font color=\"red\">For Paid Member</font>" }],
            [{ "TableName": "My Brothers and Sisters", "ColumnName": "Sister (Elder)", "Value": "<font color=\"red\">For Paid Member</font>" }],
            [{ "TableName": "My Father side & Mother side Family", "ColumnName": "Father Brother (Y)", "Value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Father side & Mother side Family", "ColumnName": "Father Sister (Y)", "Value": "<font color=\"red\">For Paid Member</font>" }],
            [{ "TableName": "My Mother side Family", "ColumnName": "MotherBrother(E)", "Value": "<font color=\"red\">For Paid Member</font>" }],
            [{ "TableName": "Relation Ship Manager", "columnname": "RelationShipManager", "value": "Srilakshmi Vadlamudi ( 08:00 to 19:00 ) " }, { "TableName": "Relation Ship Manager", "columnname": "Contact Details", "value": "91 - 9177684466" }, { "TableName": "Relation Ship Manager", "columnname": "EmailID", "value": "info@telugumarriages.com" }, { "TableName": "Relation Ship Manager", "columnname": "Note", "value": "<b><font color=\"red\">\"For Paid Member\" Information will be provided Once you become a \"PAID MEMBER\"</font></b>" }],
        ];

        model.Unapaidarrayviewprofile = [
            [{ "Row": 1, "TableName": "Headings", "Headings": "My Basic Details", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 2, "TableName": "Headings", "Headings": "My Profession & Education Information", "classname": "" }, { "Row": 3, "TableName": "Headings", "Headings": "My Location Information", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 4, "TableName": "Headings", "Headings": "My Contact & Email", "classname": "" }, { "Row": 5, "TableName": "Headings", "Headings": "About My Family", "classname": "" }, { "Row": 7, "TableName": "Headings", "Headings": "My Brothers and Sisters", "classname": "" }, { "Row": 8, "TableName": "Headings", "Headings": "My Father side & Mother side Family", "classname": "" }, { "Row": 9, "TableName": "Headings", "Headings": "My Mother side Family", "classname": "" }, { "Row": 10, "TableName": "Headings", "Headings": "My Reference Details", "classname": "" }, { "Row": 11, "TableName": "Headings", "Headings": "Profile Relation Ship Manager", "classname": "" }],
            [{ "TableName": "My Basic Details", "columnname": "NAME", "value": "SRIHARSHA SUNKARA" }, { "TableName": "My Basic Details", "columnname": "Marital Status", "value": "Divorce" }, { "TableName": "My Basic Details", "columnname": "Height", "value": "5'10 in - 177 cms" }, { "TableName": "My Basic Details", "columnname": "Caste", "value": "Kamma" }, { "TableName": "My Basic Details", "columnname": "Religion", "value": "Hindu" }, { "TableName": "My Basic Details", "columnname": "Mother Tongue", "value": "Telugu" }, { "TableName": "My Basic Details", "columnname": "Age", "value": "26-Sep-1985 (32)" }, { "TableName": "My Basic Details", "columnname": "Time of Birth (Hrs)", "value": "22:05" }, { "TableName": "My Basic Details", "columnname": "Place of Birth", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Basic Details", "columnname": "Star(Padam)", "value": "Sathabisham (3)" }, { "TableName": "My Basic Details", "columnname": "Raasi", "value": "Kumbha" }, { "TableName": "My Basic Details", "columnname": "Gothram", "value": "VIPPARLA" }, { "TableName": "My Basic Details", "columnname": "Lagnam", "value": "Not Given" }, { "TableName": "My Basic Details", "columnname": "Complexion", "value": "Fair" }],
            [{ "TableName": "My Profession & Education Information", "columnname": "Profession", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Profession & Education Information", "columnname": "Monthly Income", "value": "Rs - 100000" }, { "TableName": "My Profession & Education Information", "columnname": "Profession Details", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CA (Chartered Accountant) : <font color=\"red\">Only for Paid Members</font>,  2011" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BCom (Honours) : <font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Intermediate (MPC) : <font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSC : <font color=\"red\">Only for Paid Members</font>" }],
            [{ "TableName": "About My Family", "columnname": "Father Name", "value": "SURYA PRAKASA RAO " }, { "TableName": "About My Family", "columnname": "Father_CompanyName", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Father Contact Details", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Father Father Name &amp; Native", "value": "MADUSUDHANA RAO (LATE) LAND LORD<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Mother Name", "value": "KUSUMA KUMARI<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Mother_CompanyName", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Mother Contact Details", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Mother Father Name &amp; Native", "value": "DUGGIRALA SATYANARAYANA (80 YEARS) , AGRICULTURE.<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Parents Inter Caste", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Property", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Property Details", "value": "BUILDING AND LANDED PROPERTY + AGRL LANDS" }, { "TableName": "About My Family", "columnname": "No of Siblings", "value": "No Of Brothers: 0    No Of Sisters: 1" }],
            [{ "TableName": "About", "Aboutyourself": "", "FromReleationName": "Vadlamudi", "Fromrelationcontact": "91 - 9177684466", "FromreleationEmail": "info@telugumarriages.com", "RelationShipManager": null, "ContactDetails": null, "EmailID": null }],
            [{ "TableName": "Primary", "ProfileID": "211143826", "Cust_ID": 114382, "NAME": "SUNKARA SRIHARSHA", "GenderID": 1, "Age": 32, "ProfilePhotoName": "Img1.jpg", "PhotoName_Cust": 1, "Height": "5'10 in - 177 cms", "ReligionName": "Hindu", "Caste": "Kamma", "Education": "Finance - ICWAI/CA/CS", "StateName": ", TS", "HoroscopeImage": "src/images/view_horoscope_image.jpg", "ExpressInterestFlag": null, "ExpressInterestLinkFlag": null, "EmpFollowTicket": null, "ibookmark": 0, "No of Siblings": null, "ApplicationPhotoPath": "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_114382_Images/Img1_Images/211143826_ApplicationPhoto.jpg" }],
            [{ "TableName": "My Contact & Email", "columnname": "Address", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Contact & Email", "columnname": "Contact", "value": "<font color=\"red\">Only for Paid Members</font>" }],
            [{ "TableName": "My Brothers and Sisters", "ColumnName": "Sister (Elder)", "Value": "<font color=\"red\">Only for Paid Members</font>" }],
            [{ "TableName": "My Father side & Mother side Family", "ColumnName": "Father Brother (Y)", "Value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Father side & Mother side Family", "ColumnName": "Father Sister (Y)", "Value": "<font color=\"red\">Only for Paid Members</font>" }],
            [{ "TableName": "My Mother side Family", "ColumnName": "MotherBrother(E)", "Value": "<font color=\"red\">Only for Paid Members</font>" }],
            [{ "TableName": "My Reference Details", "columnname": "My Reference Details", "value": "KODALI RAMBABU<img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" />, <b>Current Location: </b>HYDERABAD,  <b>Native: </b>ELAMARRU, Krishna,  AP" }],
            [{ "TableName": "Profile Relation Ship Manager", "columnname": "RelationShipManager", "value": "Srilakshmi Vadlamudi ( 08:00 to 19:00 ) " }, { "TableName": "Profile Relation Ship Manager", "columnname": "Contact Details", "value": "91 - 9177684466" }, { "TableName": "Profile Relation Ship Manager", "columnname": "EmailID", "value": "info@telugumarriages.com" }]
        ];


        model.partnerinformation = function(response) {
            model.arr = [];
            model.personalinfo = {};
            model.aboutmyself = {};
            _.each(response, function(item) {
                var testArr = (item);
                if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "About") {
                    model.aboutmyself = testArr;
                } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Primary") {
                    model.personalinfo = testArr;
                    var photocount = model.personalinfo[0].PhotoName_Cust;
                    model.horoscopeimage = model.personalinfo[0].HoroscopeImage === "" ||
                        model.personalinfo[0].HoroscopeImage === null ||
                        model.personalinfo[0].HoroscopeImage === "Not given" ? false : true;
                    if (model.personalinfo[0].HoroscopeImage !== undefined && model.personalinfo[0].HoroscopeImage !== null) {
                        model.horoimagesrc = (model.personalinfo[0].HoroscopeImage).indexOf(".html") !== -1 ? 'src/images/view_horoscope_image.jpg' : model.personalinfo[0].HoroscopeImage;
                    }
                } else {
                    if (testArr.length > 0 && testArr[0].TableName !== undefined) {
                        model.arr.push({ header: testArr[0].TableName, value: testArr });
                    }
                }
            });
        };

        model.init = function() {
            if (model.typeofDiv === 'paidpartialProfile') {
                model.partnerinformation(model.paidPartialviewfull);
            } else if (model.typeofDiv === 'unpaidpartialProfile') {
                model.partnerinformation(model.unPaidPartialviewfull);
            } else if (model.typeofDiv === 'PaidFullViewProfile') {
                model.btnticket = 'KAKHD1203084';
                model.partnerinformation(model.arrayviewprofile);
            } else if (model.typeofDiv === 'unPaidFullViewProfile') {
                model.btnticket = 'KAKHD1203084';
                model.partnerinformation(model.Unapaidarrayviewprofile);
            } else {

            }
        };
        model.bindeduction = function(value) {
            if (value === 'Education') {
                value = '';
            } else {
                value = value;
            }
            return value;
        };

        return model;
    }
})();