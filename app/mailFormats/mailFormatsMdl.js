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
            [{ "TableName": "My Basic Details", "columnname": "SURNAME", "value": "ulsa" }, { "TableName": "My Basic Details", "columnname": "Marital Status", "value": "Unmarried" }, { "TableName": "My Basic Details", "columnname": "Height", "value": "5'9 in - 175 cms" }, { "TableName": "My Basic Details", "columnname": "Caste", "value": "Nai Brahmin" }, { "TableName": "My Basic Details", "columnname": "Religion", "value": "Hindu" }, { "TableName": "My Basic Details", "columnname": "Mother Tongue", "value": "Telugu" }, { "TableName": "My Basic Details", "columnname": "Age", "value": "13-Apr-1990 (27)" }, { "TableName": "My Basic Details", "columnname": "Time of Birth (Hrs)", "value": "05:00" }, { "TableName": "My Basic Details", "columnname": "Place of Birth", "value": "Nellore" }, { "TableName": "My Basic Details", "columnname": "Star(Padam)", "value": "For Paid Member" }, { "TableName": "My Basic Details", "columnname": "Raasi", "value": "mesha" }, { "TableName": "My Basic Details", "columnname": "Lagnam", "value": "Dhansu" }, { "TableName": "My Basic Details", "columnname": "Gothram", "value": "palavelli" }, { "TableName": "My Basic Details", "columnname": "Complexion", "value": "Fair" }],
            [{ "TableName": "My Location", "columnname": "Country Living", "value": "China" }, { "TableName": "My Location", "columnname": "State Living", "value": "Anhui" }],
            [{ "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M Pharmacy (Other) :  Siddhartha Institute of Pharmaceutical Sciences, Jonnalagadda" }, { "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B Pharmacy (B pharmacy) : JNT U, Gokula Krishna College of Engineering" }, { "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSC :  Sri Raghavendra High School & Junior College" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Profession", "Value": "Other " }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Company Name", "Value": "Available" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Monthly Income", "Value": "Rs - 50000 /- " }],
            [{ "TableName": "About My Family", "columnname": "Father Name", "value": "RAVINDRAPRASAD " }, { "TableName": "About My Family", "columnname": "Father Profession", "value": " " }, { "TableName": "About My Family", "columnname": "Father Native District", "value": "Not Given<br><br>" }, { "TableName": "About My Family", "columnname": "Mother Name", "value": "VANI " }, { "TableName": "About My Family", "columnname": "Mother Father Name", "value": "" }, { "TableName": "About My Family", "columnname": "Mother Native District", "value": "Not Given<br><br>" }, { "TableName": "About My Family", "columnname": "Property", "value": "Family - 100 Lakhs " }, { "TableName": "About My Family", "columnname": "No of Siblings", "value": "No Of Brothers: 1    No Of Sisters: 0" }],
            [{ "TableName": "About", "Aboutyourself": "Loves singing,painting ,Carrom player", "FromReleationName": "Dasari", "Fromrelationcontact": "91 - 040-237477", "FromreleationEmail": "info@telugumarriages.com", "RelationShipManager": "Valli Sribhashyam", "ContactDetails": "91 - 9848334348", "EmailID": "devisri348@gmail.com" }],
            [{ "TableName": "Primary", "ProfileID": "111203753", "Cust_ID": 120375, "NAME": "ulsa", "GenderID": 1, "Age": 27, "ProfilePhotoName": "Img1.jpg", "PhotoName_Cust": 3, "Height": "5'9 in - 175 cms", "ReligionName": "Hindu", "Caste": "Nai Brahmin", "Education": "Masters in Medicine", "StateName": null, "HoroscopeImage": null, "ExpressInterestFlag": null, "ExpressInterestLinkFlag": null, "EmpFollowTicket": null, "ibookmark": 0, "No of Siblings": null, "ApplicationPhotoPath": "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_120375_Images/Img1_Images/111203753_ApplicationPhoto.jpg", "RelationshipManger": "Mr.Dummy Manager", "RelationshipManagerNumber": "91-9392696969" }],
            [{ "TableName": "My Contact & Email", "columnname": "Address", "value": "Available" }, { "TableName": "My Contact & Email", "columnname": "Phone", "value": "Available" }, { "TableName": "My Contact & Email", "columnname": "Email", "value": "Available" }],
            [{ "TableName": "My Brothers and Sisters", "ColumnName": "Brother (Elder)", "Value": "Available" }],
            [{ "TableName": "Relation Ship Manager", "columnname": "RelationShipManager", "value": "prasanthi Dasari ( 09:00 to 19:00 ) " }, { "TableName": "Relation Ship Manager", "columnname": "Contact Details", "value": "91 - 040-237477" }, { "TableName": "Relation Ship Manager", "columnname": "EmailID", "value": "info@telugumarriages.com" }, { "TableName": "Relation Ship Manager", "columnname": "Note", "value": "<b><font color=\"red\">\"Available\" Information will be provided Once proceeded by both the Bride & Groom</font></b>" }]
        ];


        model.arrayviewprofile = [
            [{ "Row": 1, "TableName": "Headings", "Headings": "My Basic Details", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 2, "TableName": "Headings", "Headings": "My Profession & Education Information", "classname": "" }, { "Row": 3, "TableName": "Headings", "Headings": "My Location Information", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 4, "TableName": "Headings", "Headings": "My Contact & Email", "classname": "" }, { "Row": 5, "TableName": "Headings", "Headings": "About My Family", "classname": "" }, { "Row": 7, "TableName": "Headings", "Headings": "My Brothers and Sisters", "classname": "" }, { "Row": 8, "TableName": "Headings", "Headings": "My Father side & Mother side Family", "classname": "" }, { "Row": 9, "TableName": "Headings", "Headings": "My Mother side Family", "classname": "" }, { "Row": 10, "TableName": "Headings", "Headings": "My Reference Details", "classname": "" }, { "Row": 11, "TableName": "Headings", "Headings": "Profile Relation Ship Manager", "classname": "" }],
            [{ "TableName": "My Basic Details", "columnname": "NAME", "value": "Praveen kumar ulsa" }, { "TableName": "My Basic Details", "columnname": "Marital Status", "value": "Unmarried" }, { "TableName": "My Basic Details", "columnname": "Height", "value": "5'9 in - 175 cms" }, { "TableName": "My Basic Details", "columnname": "Caste", "value": "Nai Brahmin" }, { "TableName": "My Basic Details", "columnname": "Religion", "value": "Hindu" }, { "TableName": "My Basic Details", "columnname": "Mother Tongue", "value": "Telugu" }, { "TableName": "My Basic Details", "columnname": "Age", "value": "13-Apr-1990 (27)" }, { "TableName": "My Basic Details", "columnname": "Time of Birth (Hrs)", "value": "05:00" }, { "TableName": "My Basic Details", "columnname": "Place of Birth", "value": "Nellore" }, { "TableName": "My Basic Details", "columnname": "Star(Padam)", "value": "Anuradha" }, { "TableName": "My Basic Details", "columnname": "Raasi", "value": "mesha" }, { "TableName": "My Basic Details", "columnname": "Gothram", "value": "palavelli" }, { "TableName": "My Basic Details", "columnname": "Lagnam", "value": "Dhansu" }, { "TableName": "My Basic Details", "columnname": "Complexion", "value": "Fair" }],
            [{ "TableName": "My Location Information", "columnname": "Country Living", "value": "China" }, { "TableName": "My Location Information", "columnname": "State Living", "value": "Not Given" }],
            [{ "TableName": "My Profession & Education Information", "columnname": "Profession", "value": "Other, Caplin point laboratories limited " }, { "TableName": "My Profession & Education Information", "columnname": "Monthly Income", "value": "Rs - 50000" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M Pharmacy (Other) : Siddhartha Institute of Pharmaceutical Sciences, Jonnalagadda, Narasaraopet ,  AP" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B Pharmacy (B pharmacy) :JNT U, Gokula Krishna College of Engineering, Sullurpeta ,  AP" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSC : Sri Raghavendra High School & Junior College, Atmakur,  AP" }],
            [{ "TableName": "About My Family", "columnname": "Father Name", "value": "RAVINDRAPRASAD     " }, { "TableName": "About My Family", "columnname": "Father Contact Details", "value": "<b>Phone : </b><img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Email ID : </b> <img src=\"http://kaakateeya.com/dist/Images/ico_mail.png\" />" }, { "TableName": "About My Family", "columnname": "Mother Name", "value": "VANI    " }, { "TableName": "About My Family", "columnname": "Mother Contact Details", "value": "<b>Phone : </b><img src=\"http://kaakateeya.com/dist/images/icon.land.jpg\" /> & <img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Email ID : </b><img src=\"http://kaakateeya.com/dist/images/ico_mail.png\" />" }, { "TableName": "About My Family", "columnname": "Mother Father Name &amp; Native", "value": " <img src=\"http://kaakateeya.com/dist/images/icon.land.jpg\" /> & <img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /> <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Native: </b>South mopur, S.P.S.R.Nellore(d.t)" }, { "TableName": "About My Family", "columnname": "Property", "value": "Family - 100 Lakhs " }, { "TableName": "About My Family", "columnname": "Property Details", "value": "1.own house in villege 2. land in guduru,nellurkavari.." }, { "TableName": "About My Family", "columnname": "No of Siblings", "value": "No Of Brothers: 1    No Of Sisters: 0" }],
            [{ "TableName": "About", "Aboutyourself": "" }],
            [{ "TableName": "Primary", "ProfileID": "111203753", "Cust_ID": 120375, "NAME": "ulsa Praveen kumar", "GenderID": 1, "Age": 27, "ProfilePhotoName": "Img1.jpg", "PhotoName_Cust": 3, "Height": "5'9 in - 175 cms", "ReligionName": "Hindu", "Caste": "Nai Brahmin", "Education": "Masters in Medicine", "StateName": null, "HoroscopeImage": null, "ExpressInterestFlag": null, "ExpressInterestLinkFlag": null, "EmpFollowTicket": null, "ibookmark": 0, "No of Siblings": null, "ApplicationPhotoPath": "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_120375_Images/Img1_Images/111203753_ApplicationPhoto.jpg" }],
            [{ "TableName": "My Contact & Email", "columnname": "Address", "value": "Available" }, { "TableName": "My Contact & Email", "columnname": "Contact", "value": "<img src=\"http://kaakateeya.com/dist/images/icon.land.jpg\" />  <img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /><img src=\"http://kaakateeya.com/dist/Images/ico_mail.png\" />" }],
            [{ "TableName": "My Brothers and Sisters", "ColumnName": "Brother (Elder)", "Value": "sravankumar, MBA, Private Job, kusumavishwaneni@gmail.com &nbsp;&nbsp;<b>Wife:</b> vasundara, BTECH" }],
            [{ "TableName": "Profile Relation Ship Manager", "columnname": "RelationShipManager", "value": "prasanthi Dasari ( 09:00 to 19:00 ) " }, { "TableName": "Profile Relation Ship Manager", "columnname": "Contact Details", "value": "91 - 040-237477" }, { "TableName": "Profile Relation Ship Manager", "columnname": "EmailID", "value": "info@telugumarriages.com" }]
        ];


        model.unPaidPartialviewfull = [
            [{ "Row": 1, "TableName": "Headings", "Headings": "My Basic Details", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 2, "TableName": "Headings", "Headings": "My Education & Profession", "classname": "" }, { "Row": 3, "TableName": "Headings", "Headings": "My Location", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 4, "TableName": "Headings", "Headings": "My Contact & Email", "classname": "" }, { "Row": 5, "TableName": "Headings", "Headings": "About My Family", "classname": "" }, { "Row": 7, "TableName": "Headings", "Headings": "My Brothers and Sisters", "classname": "" }, { "Row": 8, "TableName": "Headings", "Headings": "My Father side & Mother side Family", "classname": "" }, { "Row": 9, "TableName": "Headings", "Headings": "My Mother side Family", "classname": "" }, { "Row": 10, "TableName": "Headings", "Headings": "My Reference Details", "classname": "" }, { "Row": 11, "TableName": "Headings", "Headings": "Profile Relation Ship Manager", "classname": "" }],
            [{ "TableName": "My Basic Details", "columnname": "SURNAME", "value": "ulsa" }, { "TableName": "My Basic Details", "columnname": "Marital Status", "value": "Unmarried" }, { "TableName": "My Basic Details", "columnname": "Height", "value": "5'9 in - 175 cms" }, { "TableName": "My Basic Details", "columnname": "Caste", "value": "Nai Brahmin" }, { "TableName": "My Basic Details", "columnname": "Religion", "value": "Hindu" }, { "TableName": "My Basic Details", "columnname": "Mother Tongue", "value": "Telugu" }, { "TableName": "My Basic Details", "columnname": "Age", "value": "13-Apr-1990 (27)" }, { "TableName": "My Basic Details", "columnname": "Time of Birth (Hrs)", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Basic Details", "columnname": "Place of Birth", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Basic Details", "columnname": "Star(Padam)", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Basic Details", "columnname": "Raasi", "value": "mesha" }, { "TableName": "My Basic Details", "columnname": "Lagnam", "value": "Not Given" }, { "TableName": "My Basic Details", "columnname": "Gothram", "value": "palavelli" }, { "TableName": "My Basic Details", "columnname": "Complexion", "value": "Fair" }],
            [{ "TableName": "My Location", "columnname": "Country Living", "value": "China" }, { "TableName": "My Location", "columnname": "State Living", "value": "Not Given" }],
            [{ "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M Pharmacy (Other) : <font color=\"red\">For Paid Member</font>" }, { "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B Pharmacy (B pharmacy) : <font color=\"red\">For Paid Member</font>" }, { "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSC : <font color=\"red\">For Paid Member</font>" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Profession", "Value": "Other " }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Company Name", "Value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Profession Details", "Value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Monthly Income", "Value": "<font color=\"red\">For Paid Member</font>" }],
            [{ "TableName": "About My Family", "columnname": "Father Name", "value": "RAVINDRAPRASAD " }, { "TableName": "About My Family", "columnname": "Father Profession", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "About My Family", "columnname": "Father Native District", "value": "<font color=\"red\">For Paid Member</font><br><br>" }, { "TableName": "About My Family", "columnname": "Mother Name", "value": "VANI " }, { "TableName": "About My Family", "columnname": "Mother Father Name", "value": "" }, { "TableName": "About My Family", "columnname": "Mother Native District", "value": "<font color=\"red\">For Paid Member</font><br><br>" }, { "TableName": "About My Family", "columnname": "Property", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "About My Family", "columnname": "No of Siblings", "value": "No Of Brothers: 1    No Of Sisters: 0" }],
            [{ "TableName": "About", "Aboutyourself": "Loves singing,painting ,Carrom player", "FromReleationName": "Dasari", "Fromrelationcontact": "91 - 040-237477", "FromreleationEmail": "info@telugumarriages.com", "RelationShipManager": "Valli Sribhashyam", "ContactDetails": "91 - 9848334348", "EmailID": "devisri348@gmail.com" }],
            [{ "TableName": "Primary", "ProfileID": "111203753", "Cust_ID": 120375, "NAME": "ulsa", "GenderID": 1, "Age": 27, "ProfilePhotoName": "Img1.jpg", "PhotoName_Cust": 3, "Height": "5'9 in - 175 cms", "ReligionName": "Hindu", "Caste": "Nai Brahmin", "Education": "Masters in Medicine", "StateName": null, "HoroscopeImage": null, "ExpressInterestFlag": null, "ExpressInterestLinkFlag": null, "EmpFollowTicket": null, "ibookmark": 0, "No of Siblings": null, "ApplicationPhotoPath": "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_120375_Images/Img1_Images/111203753_ApplicationPhoto.jpg", "RelationshipManger": "Mr.Dummy Manager", "RelationshipManagerNumber": "91-9392696969" }],
            [{ "TableName": "My Contact & Email", "columnname": "Address", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Contact & Email", "columnname": "Phone", "value": "<font color=\"red\">For Paid Member</font>" }, { "TableName": "My Contact & Email", "columnname": "Email", "value": "<font color=\"red\">For Paid Member</font>" }],
            [{ "TableName": "My Brothers and Sisters", "ColumnName": "Brother (Elder)", "Value": "<font color=\"red\">For Paid Member</font>" }],
            [{ "TableName": "Relation Ship Manager", "columnname": "RelationShipManager", "value": "prasanthi Dasari ( 09:00 to 19:00 ) " }, { "TableName": "Relation Ship Manager", "columnname": "Contact Details", "value": "91 - 040-237477" }, { "TableName": "Relation Ship Manager", "columnname": "EmailID", "value": "info@telugumarriages.com" }, { "TableName": "Relation Ship Manager", "columnname": "Note", "value": "<b><font color=\"red\">\"For Paid Member\" Information will be provided Once you become a \"PAID MEMBER\"</font></b>" }]
        ];


        model.Unapaidarrayviewprofile = [
            [{ "Row": 1, "TableName": "Headings", "Headings": "My Basic Details", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 2, "TableName": "Headings", "Headings": "My Profession & Education Information", "classname": "" }, { "Row": 3, "TableName": "Headings", "Headings": "My Location Information", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 4, "TableName": "Headings", "Headings": "My Contact & Email", "classname": "" }, { "Row": 5, "TableName": "Headings", "Headings": "About My Family", "classname": "" }, { "Row": 7, "TableName": "Headings", "Headings": "My Brothers and Sisters", "classname": "" }, { "Row": 8, "TableName": "Headings", "Headings": "My Father side & Mother side Family", "classname": "" }, { "Row": 9, "TableName": "Headings", "Headings": "My Mother side Family", "classname": "" }, { "Row": 10, "TableName": "Headings", "Headings": "My Reference Details", "classname": "" }, { "Row": 11, "TableName": "Headings", "Headings": "Profile Relation Ship Manager", "classname": "" }],
            [{ "TableName": "My Basic Details", "columnname": "NAME", "value": "Praveen kumar ulsa" }, { "TableName": "My Basic Details", "columnname": "Marital Status", "value": "Unmarried" }, { "TableName": "My Basic Details", "columnname": "Height", "value": "5'9 in - 175 cms" }, { "TableName": "My Basic Details", "columnname": "Caste", "value": "Nai Brahmin" }, { "TableName": "My Basic Details", "columnname": "Religion", "value": "Hindu" }, { "TableName": "My Basic Details", "columnname": "Mother Tongue", "value": "Telugu" }, { "TableName": "My Basic Details", "columnname": "Age", "value": "13-Apr-1990 (27)" }, { "TableName": "My Basic Details", "columnname": "Time of Birth (Hrs)", "value": "05:00" }, { "TableName": "My Basic Details", "columnname": "Place of Birth", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Basic Details", "columnname": "Star(Padam)", "value": "Anuradha" }, { "TableName": "My Basic Details", "columnname": "Raasi", "value": "mesha" }, { "TableName": "My Basic Details", "columnname": "Gothram", "value": "palavelli" }, { "TableName": "My Basic Details", "columnname": "Lagnam", "value": "Dhansu" }, { "TableName": "My Basic Details", "columnname": "Complexion", "value": "Fair" }],
            [{ "TableName": "My Profession & Education Information", "columnname": "Profession", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Profession & Education Information", "columnname": "Monthly Income", "value": "Rs - 50000" }, { "TableName": "My Profession & Education Information", "columnname": "Profession Details", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M Pharmacy (Other) : <font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B Pharmacy (B pharmacy) :JNT U, <font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSC : <font color=\"red\">Only for Paid Members</font>" }],
            [{ "TableName": "About My Family", "columnname": "Father Name", "value": "RAVINDRAPRASAD " }, { "TableName": "About My Family", "columnname": "Father_CompanyName", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Father Contact Details", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Mother Name", "value": "VANI<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Mother_CompanyName", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Mother Contact Details", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Mother Father Name &amp; Native", "value": " <font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Parents Inter Caste", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Property", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "About My Family", "columnname": "Property Details", "value": "1.own house in villege 2. land in guduru,nellurkavari.." }, { "TableName": "About My Family", "columnname": "No of Siblings", "value": "No Of Brothers: 1    No Of Sisters: 0" }],
            [{ "TableName": "About", "Aboutyourself": "" }],
            [{ "TableName": "Primary", "ProfileID": "111203753", "Cust_ID": 120375, "NAME": "ulsa Praveen kumar", "GenderID": 1, "Age": 27, "ProfilePhotoName": "Img1.jpg", "PhotoName_Cust": 3, "Height": "5'9 in - 175 cms", "ReligionName": "Hindu", "Caste": "Nai Brahmin", "Education": "Masters in Medicine", "StateName": null, "HoroscopeImage": null, "ExpressInterestFlag": null, "ExpressInterestLinkFlag": null, "EmpFollowTicket": null, "ibookmark": 0, "No of Siblings": null, "ApplicationPhotoPath": "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_120375_Images/Img1_Images/111203753_ApplicationPhoto.jpg" }],
            [{ "TableName": "My Contact & Email", "columnname": "Address", "value": "<font color=\"red\">Only for Paid Members</font>" }, { "TableName": "My Contact & Email", "columnname": "Contact", "value": "<font color=\"red\">Only for Paid Members</font>" }],
            [{ "TableName": "My Brothers and Sisters", "ColumnName": "Brother (Elder)", "Value": "<font color=\"red\">Only for Paid Members</font>" }],
            [{ "TableName": "Profile Relation Ship Manager", "columnname": "RelationShipManager", "value": "prasanthi Dasari ( 09:00 to 19:00 ) " }, { "TableName": "Profile Relation Ship Manager", "columnname": "Contact Details", "value": "91 - 040-237477" }, { "TableName": "Profile Relation Ship Manager", "columnname": "EmailID", "value": "info@telugumarriages.com" }]
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