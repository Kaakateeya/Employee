(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('sampleViewfullprofileModel', factory);

    factory.$inject = ['sampleViewfullprofileService'];

    function factory(sampleViewfullprofileService) {
        var model = {};
        model.arrayviewfull = [
            [{ "Row": 1, "TableName": "Headings", "Headings": "My Basic Details", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 2, "TableName": "Headings", "Headings": "My Education & Profession", "classname": "" }, { "Row": 3, "TableName": "Headings", "Headings": "My Location", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 4, "TableName": "Headings", "Headings": "My Contact & Email", "classname": "" }, { "Row": 5, "TableName": "Headings", "Headings": "About My Family", "classname": "" }, { "Row": 7, "TableName": "Headings", "Headings": "My Brothers and Sisters", "classname": "" }, { "Row": 8, "TableName": "Headings", "Headings": "My Father side & Mother side Family", "classname": "" }, { "Row": 9, "TableName": "Headings", "Headings": "My Mother side Family", "classname": "" }, { "Row": 10, "TableName": "Headings", "Headings": "My Reference Details", "classname": "" }, { "Row": 11, "TableName": "Headings", "Headings": "Profile Relation Ship Manager", "classname": "" }],
            [{ "TableName": "My Basic Details", "columnname": "SURNAME", "value": "S" }, { "TableName": "My Basic Details", "columnname": "Marital Status", "value": "Unmarried" }, { "TableName": "My Basic Details", "columnname": "Height", "value": "6'0 in - 183 cms" }, { "TableName": "My Basic Details", "columnname": "Caste", "value": "Reddy" }, { "TableName": "My Basic Details", "columnname": "Religion", "value": "Hindu" }, { "TableName": "My Basic Details", "columnname": "Mother Tongue", "value": "Telugu" }, { "TableName": "My Basic Details", "columnname": "Age", "value": "22-Aug-1990 (27)" }, { "TableName": "My Basic Details", "columnname": "Time of Birth (Hrs)", "value": "13:11" }, { "TableName": "My Basic Details", "columnname": "Place of Birth", "value": "Pulivendla" }, { "TableName": "My Basic Details", "columnname": "Star(Padam)", "value": "Not Specified" }, { "TableName": "My Basic Details", "columnname": "Raasi", "value": "mesha" }, { "TableName": "My Basic Details", "columnname": "Lagnam", "value": "Not Given" }, { "TableName": "My Basic Details", "columnname": "Gothram", "value": "Madhakolla" }, { "TableName": "My Basic Details", "columnname": "Complexion", "value": "Fair" }],
            [{ "TableName": "My Location", "columnname": "Country Living", "value": "India" }, { "TableName": "My Location", "columnname": "State Living", "value": "Andhra Pradesh" }, { "TableName": "My Location", "columnname": "District Living", "value": "Y S R" }],
            [{ "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MBA (Marketing) :  SRISAI INSTITUTE" }, { "TableName": "My Education & Profession", "ColumnName": "Education", "Value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BTech (Information and Technology) :  KORM COLLEGE OF OF ENGG " }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Profession", "Value": "Other, Near Vempalle, AP. working since - 18-Dec-2015" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Company Name", "Value": "Available" }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Profession Details", "Value": "HE  WILL  GO  TO  USA  ........SEARCHING JOB .......PRESENT NO JOB " }, { "TableName": "My Education & Profession<br><br>", "ColumnName": "Monthly Income", "Value": "IRR - 20000 /- " }],
            [{ "TableName": "About My Family", "columnname": "Father Name", "value": "Subba Reddy (LATE), dwwwwwwww" }, { "TableName": "About My Family", "columnname": "Father Profession", "value": " " }, { "TableName": "About My Family", "columnname": "Father Father Name", "value": "KRISHNAREDDY(LATE)" }, { "TableName": "About My Family", "columnname": "Father Native District", "value": "y s r, AP<br><br>" }, { "TableName": "About My Family", "columnname": "Mother Name", "value": "Annapurna " }, { "TableName": "About My Family", "columnname": "Mother Father Name", "value": "SUBBIREDDY" }, { "TableName": "About My Family", "columnname": "Mother Native District", "value": "y s r, AP<br><br>" }, { "TableName": "About My Family", "columnname": "No of Siblings", "value": "No Of Brothers: 1    No Of Sisters: 1" }],
            [{ "TableName": "About", "Aboutyourself": "Loves singing,painting ,Carrom player", "FromReleationName": "V", "Fromrelationcontact": "91 - 9848535378", "FromreleationEmail": "tirupatikaakateeya@yahoo.com", "RelationShipManager": "Valli Sribhashyam", "ContactDetails": "91 - 9848334348", "EmailID": "devisri348@gmail.com" }],
            [{ "TableName": "Primary", "ProfileID": "210910352", "Cust_ID": 91035, "NAME": "S", "GenderID": 1, "Age": 27, "ProfilePhotoName": null, "PhotoName_Cust": null, "Height": "6'0 in - 183 cms", "ReligionName": "Hindu", "Caste": "Reddy", "Education": "Masters in Degree", "StateName": ", AP", "HoroscopeImage": "http://d16o2fcjgzj2wp.cloudfront.net/Images/HoroscopeImages/91035_HaroscopeImage/91035_HaroscopeImage.html", "ExpressInterestFlag": null, "ExpressInterestLinkFlag": null, "EmpFollowTicket": null, "ibookmark": 0, "No of Siblings": null, "ApplicationPhotoPath": "http://d16o2fcjgzj2wp.cloudfront.net/Images/customernoimages/Mnoimage.jpg", "RelationshipManger": "Mr.Dummy Manager", "RelationshipManagerNumber": "91-9392696969" }],
            [{ "TableName": "My Contact & Email", "columnname": "Address", "value": "Available" }, { "TableName": "My Contact & Email", "columnname": "Phone", "value": "Available" }, { "TableName": "My Contact & Email", "columnname": "Email", "value": "Available" }],
            [{ "TableName": "My Brothers and Sisters", "ColumnName": "Brother (Elder)", "Value": "Available" }, { "TableName": "My Brothers and Sisters", "ColumnName": "Sister (Younger)", "Value": "Available" }],
            [{ "TableName": "My Father side & Mother side Family", "ColumnName": "Father Brother (E)", "Value": "Available" }, { "TableName": "My Father side & Mother side Family", "ColumnName": "Father Sister (E)", "Value": "Available" }],
            [{ "TableName": "My Mother side Family", "ColumnName": "MotherBrother(E)", "Value": "Available" }],
            [{ "TableName": "Relation Ship Manager", "columnname": "RelationShipManager", "value": "Jhansi V ( 08:00 to 19:00 ) " }, { "TableName": "Relation Ship Manager", "columnname": "Contact Details", "value": "91 - 9848535378" }, { "TableName": "Relation Ship Manager", "columnname": "EmailID", "value": "tirupatikaakateeya@yahoo.com" }, { "TableName": "Relation Ship Manager", "columnname": "Note", "value": "<b><font color=\"red\">\"Available\" Information will be provided Once proceeded by both the Bride & Groom</font></b>" }]
        ];

        model.arrayviewprofile = [
            [{ "Row": 1, "TableName": "Headings", "Headings": "My Basic Details", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 2, "TableName": "Headings", "Headings": "My Profession & Education Information", "classname": "" }, { "Row": 3, "TableName": "Headings", "Headings": "My Location Information", "classname": "personal_inform_main_in_list clearfix" }, { "Row": 4, "TableName": "Headings", "Headings": "My Contact & Email", "classname": "" }, { "Row": 5, "TableName": "Headings", "Headings": "About My Family", "classname": "" }, { "Row": 7, "TableName": "Headings", "Headings": "My Brothers and Sisters", "classname": "" }, { "Row": 8, "TableName": "Headings", "Headings": "My Father side & Mother side Family", "classname": "" }, { "Row": 9, "TableName": "Headings", "Headings": "My Mother side Family", "classname": "" }, { "Row": 10, "TableName": "Headings", "Headings": "My Reference Details", "classname": "" }, { "Row": 11, "TableName": "Headings", "Headings": "Profile Relation Ship Manager", "classname": "" }],
            [{ "TableName": "My Basic Details", "columnname": "NAME", "value": "Kishore Avirneni" }, { "TableName": "My Basic Details", "columnname": "Marital Status", "value": "Unmarried" }, { "TableName": "My Basic Details", "columnname": "Height", "value": "5'6 in - 167 cms" }, { "TableName": "My Basic Details", "columnname": "Caste", "value": "Kamma" }, { "TableName": "My Basic Details", "columnname": "Religion", "value": "Hindu" }, { "TableName": "My Basic Details", "columnname": "Mother Tongue", "value": "Telugu" }, { "TableName": "My Basic Details", "columnname": "Age", "value": "07-May-1989 (28)" }, { "TableName": "My Basic Details", "columnname": "Time of Birth (Hrs)", "value": "22:20" }, { "TableName": "My Basic Details", "columnname": "Place of Birth", "value": "Vissannapeta" }, { "TableName": "My Basic Details", "columnname": "Star(Padam)", "value": "Rohini (4)" }, { "TableName": "My Basic Details", "columnname": "Raasi", "value": "Not Specified" }, { "TableName": "My Basic Details", "columnname": "Gothram", "value": "Talluru" }, { "TableName": "My Basic Details", "columnname": "Lagnam", "value": "Not Given" }, { "TableName": "My Basic Details", "columnname": "Complexion", "value": "Fair" }],
            [{ "TableName": "My Location Information", "columnname": "Country Living", "value": "India" }, { "TableName": "My Location Information", "columnname": "State Living", "value": "Karnataka" }, { "TableName": "My Location Information", "columnname": "City Living", "value": "Bengaluru" }],
            [{ "TableName": "My Profession & Education Information", "columnname": "Profession", "value": "Associate Consultant, ITC INFOTECH, Bengaluru, KA" }, { "TableName": "My Profession & Education Information", "columnname": "Monthly Income", "value": "Rs - 60000" }, { "TableName": "My Profession & Education Information", "columnname": "Profession Details", "value": "Associate I.T Consultant, ITC Infotech, Bangalore since April 2017. He had also past experience at Bengaluru." }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BTech (ECE) : MIC ENGINEERING COLLEGE, Kanchikacherla ,  AP,  2011" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diploma (Electronics) : POLYTECHNIC, Eluru,  AP" }, { "TableName": "My Profession & Education Information", "columnname": "", "value": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSC : Sri Vidya Public School, veleru,  AP" }],
            [{ "TableName": "About My Family", "columnname": "Father Name", "value": "Udaya Bhaskara Rao     " }, { "TableName": "About My Family", "columnname": "Father Contact Details", "value": "<b>Phone : </b><img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Email ID : </b> <img src=\"http://kaakateeya.com/dist/Images/ico_mail.png\" />" }, { "TableName": "About My Family", "columnname": "Father Father Name &amp; Native", "value": "Ramakotaiah, ( Late ) Farmer<img src=\"http://kaakateeya.com/dist/images/icon.land.jpg\" /> & <img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Native: </b>Remalle, Krishna" }, { "TableName": "About My Family", "columnname": "Mother Name", "value": "Kantha Kumari    " }, { "TableName": "About My Family", "columnname": "Mother Contact Details", "value": "<b>Phone : </b><img src=\"http://kaakateeya.com/dist/images/icon.land.jpg\" /> & <img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Email ID : </b><img src=\"http://kaakateeya.com/dist/images/ico_mail.png\" />" }, { "TableName": "About My Family", "columnname": "Mother Father Name &amp; Native", "value": "Kaja Venkateswara Rao, Farmer<img src=\"http://kaakateeya.com/dist/images/icon.land.jpg\" /> & <img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /> <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Native: </b>Vissannapet, Krishna, AP" }, { "TableName": "About My Family", "columnname": "Property", "value": "Family - 100 Lakhs " }, { "TableName": "About My Family", "columnname": "Property Details", "value": "Half Acre Mango Garden at Remalle,  Two House sites at Remalle and house. at Remalle." }, { "TableName": "About My Family", "columnname": "No of Siblings", "value": "No Of Brothers: 0    No Of Sisters: 1" }],
            [{ "TableName": "About", "Aboutyourself": "" }],
            [{ "TableName": "Primary", "ProfileID": "011206867", "Cust_ID": 120686, "NAME": "Avirneni Kishore", "GenderID": 1, "Age": 28, "ProfilePhotoName": "Img3.jpg", "PhotoName_Cust": 5, "Height": "5'6 in - 167 cms", "ReligionName": "Hindu", "Caste": "Kamma", "Education": "Bachelors in Engineering", "StateName": ", KA", "HoroscopeImage": "http://d16o2fcjgzj2wp.cloudfront.net/Images/HoroscopeImages/120686_HaroscopeImage/120686_HaroscopeImage.html", "ExpressInterestFlag": null, "ExpressInterestLinkFlag": null, "EmpFollowTicket": null, "ibookmark": 0, "No of Siblings": null, "ApplicationPhotoPath": "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_120686_Images/Img3_Images/011206867_ApplicationPhoto.jpg" }],
            [{ "TableName": "My Contact & Email", "columnname": "Address", "value": "Available" }, { "TableName": "My Contact & Email", "columnname": "Contact", "value": "<img src=\"http://kaakateeya.com/dist/images/icon.land.jpg\" />  <img src=\"http://kaakateeya.com/dist/images/mobile_icon.png\" /><img src=\"http://kaakateeya.com/dist/Images/ico_mail.png\" />" }],
            [{ "TableName": "My Brothers and Sisters", "ColumnName": "Sister (Elder)", "Value": "Vanitha, Intermediate, 28asha88@gmail.com &nbsp;&nbsp;<b>W/O:</b> Venkateswara Rao, Agriculture, Eedulagudem near Agiripalli ( Nuzvid), <b>S/O: </b>Kondasani Pitcheswara Rao, Farmer, <b>Native: </b>Eedulagudem, Krishna, A.P " }],
            [{ "TableName": "My Father side & Mother side Family", "ColumnName": "Father Brother (E)", "Value": "Sambasiva Rao, Farmer, 28asha88@gmail.com, Remalle " }, { "TableName": "My Father side & Mother side Family", "ColumnName": "Father Brother (E)", "Value": "Veerabhadra Rao, Farmer, 28asha88@gmail.com, Remalle " }, { "TableName": "My Father side & Mother side Family", "ColumnName": "Father Sister (E)", "Value": "Lakshmi Samrajyam&nbsp;&nbsp;<b>W/O:</b> Kondasani Pitcheswara Rao (Late ), Agriculture, <b>Native: </b>Eedulagudem, Krishna, AP , <b>Current Location: </b>Eedulagudem" }],
            [],
            [],
            [{ "TableName": "Profile Relation Ship Manager", "columnname": "RelationShipManager", "value": "sandhya Adusumilli ( 08:00 to 19:00 ) " }, { "TableName": "Profile Relation Ship Manager", "columnname": "Contact Details", "value": "91 - 9394893947" }, { "TableName": "Profile Relation Ship Manager", "columnname": "EmailID", "value": "yvrao@telugumarriages.com" }]
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

        model.init = function(stateparamid) {
            if (stateparamid === '0') {
                model.partnerinformation(model.arrayviewfull);
            } else if (stateparamid === '1') {
                model.btnticket = 'KAKHD1203084';
                model.partnerinformation(model.arrayviewprofile);
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