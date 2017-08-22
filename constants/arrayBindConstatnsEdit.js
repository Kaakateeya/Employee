(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .constant('arrayConstantsEdit', {
            'MaritalStatus': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Unmarried", "title": "Unmarried", "value": 43 },
                { "label": "Divorce", "title": "Divorce", "value": 44 },
                { "label": "Widow/Widower", "title": "Widow/Widower", "value": 45 },
                { "label": "Separated", "title": "Separated", "value": 46 },
                { "label": "NULL AND VOID", "title": "NULL AND VOID", "value": 565 }
            ],

            "heightregistration": [
                { "label": "4'8 in - 142 cms", "title": "4'8 in - 142 cms", "value": 9 },
                { "label": "4'9 in - 144 cms", "title": "4'9 in - 144 cms", "value": 10 }, { "label": "4'10 in - 147 cms", "title": "4'10 in - 147 cms", "value": 11 },
                { "label": "4'11 in - 150 cms", "title": "4'11 in - 150 cms", "value": 12 }, { "label": "5'0 in - 152 cms", "title": "5'0 in - 152 cms", "value": 13 },
                { "label": "5'1 in - 155 cms", "title": "5'1 in - 155 cms", "value": 14 }, { "label": "5'2 in - 157 cms", "title": "5'2 in - 157 cms", "value": 15 },
                { "label": "5'3 in - 160 cms", "title": "5'3 in - 160 cms", "value": 16 }, { "label": "5'4 in - 162 cms", "title": "5'4 in - 162 cms", "value": 17 },
                { "label": "5'5 in - 165 cms", "title": "5'5 in - 165 cms", "value": 18 }, { "label": "5'6 in - 167 cms", "title": "5'6 in - 167 cms", "value": 19 },
                { "label": "5'7 in - 170 cms", "title": "5'7 in - 170 cms", "value": 20 }, { "label": "5'8 in - 172 cms", "title": "5'8 in - 172 cms", "value": 21 },
                { "label": "5'9 in - 175 cms", "title": "5'9 in - 175 cms", "value": 22 }, { "label": "5'10 in - 177 cms", "title": "5'10 in - 177 cms", "value": 23 },
                { "label": "5'11 in - 180 cms", "title": "5'11 in - 180 cms", "value": 24 }, { "label": "6'0 in - 183 cms", "title": "6'0 in - 183 cms", "value": 25 },
                { "label": "6'1 in - 185 cms", "title": "6'1 in - 185 cms", "value": 26 }, { "label": "6'2 in - 188 cms", "title": "6'2 in - 188 cms", "value": 27 },
                { "label": "6'3 in - 190 cms", "title": "6'3 in - 190 cms", "value": 28 }, { "label": "6'4 in - 193 cms", "title": "6'4 in - 193 cms", "value": 29 },
                { "label": "6'5 in - 195 cms", "title": "6'5 in - 195 cms", "value": 30 }, { "label": "6'6 in - 198 cms", "title": "6'6 in - 198 cms", "value": 31 },
                { "label": "6'7 in - 200 cms", "title": "6'7 in - 200 cms", "value": 32 }, { "label": "6'8 in - 203 cms", "title": "6'8 in - 203 cms", "value": 33 },
                { "label": "6'9 in - 205 cms", "title": "6'9 in - 205 cms", "value": 34 }, { "label": "6'10 in - 208 cms", "title": "6'10 in - 208 cms", "value": 35 },
                { "label": "6'11 in - 210 cms", "title": "6'11 in - 210 cms", "value": 36 }, { "label": "7'0 in - 213 cms\t", "title": "7'0 in - 213 cms\t", "value": 37 },
                { "label": "7'1 in - 215 cms\t", "title": "7'1 in - 215 cms\t", "value": 38 }, { "label": "7'2 in - 218 cms\t", "title": "7'2 in - 218 cms\t", "value": 39 }
            ],
            "height": [
                { "label": "--Select--", "title": "--select--", "value": "" },
                { "label": "4'0 in - 122 cms", "title": "4'0 in - 122 cms", "value": 1 }, { "label": "4'1 in - 124 cms", "title": "4'1 in - 124 cms", "value": 2 },
                { "label": "4'2 in - 127 cms", "title": "4'2 in - 127 cms", "value": 3 },
                { "label": "4'3 in - 130 cms", "title": "4'3 in - 130 cms", "value": 4 }, { "label": "4'4 in - 132 cms", "title": "4'4 in - 132 cms", "value": 5 },
                { "label": "4'5 in - 135 cms", "title": "4'5 in - 135 cms", "value": 6 }, { "label": "4'6 in - 137 cms", "title": "4'6 in - 137 cms", "value": 7 },
                { "label": "4'7 in - 140 cms", "title": "4'7 in - 140 cms", "value": 8 },
                { "label": "4'8 in - 142 cms", "title": "4'8 in - 142 cms", "value": 9 },
                { "label": "4'9 in - 144 cms", "title": "4'9 in - 144 cms", "value": 10 }, { "label": "4'10 in - 147 cms", "title": "4'10 in - 147 cms", "value": 11 },
                { "label": "4'11 in - 150 cms", "title": "4'11 in - 150 cms", "value": 12 }, { "label": "5'0 in - 152 cms", "title": "5'0 in - 152 cms", "value": 13 },
                { "label": "5'1 in - 155 cms", "title": "5'1 in - 155 cms", "value": 14 }, { "label": "5'2 in - 157 cms", "title": "5'2 in - 157 cms", "value": 15 },
                { "label": "5'3 in - 160 cms", "title": "5'3 in - 160 cms", "value": 16 }, { "label": "5'4 in - 162 cms", "title": "5'4 in - 162 cms", "value": 17 },
                { "label": "5'5 in - 165 cms", "title": "5'5 in - 165 cms", "value": 18 }, { "label": "5'6 in - 167 cms", "title": "5'6 in - 167 cms", "value": 19 },
                { "label": "5'7 in - 170 cms", "title": "5'7 in - 170 cms", "value": 20 }, { "label": "5'8 in - 172 cms", "title": "5'8 in - 172 cms", "value": 21 },
                { "label": "5'9 in - 175 cms", "title": "5'9 in - 175 cms", "value": 22 }, { "label": "5'10 in - 177 cms", "title": "5'10 in - 177 cms", "value": 23 },
                { "label": "5'11 in - 180 cms", "title": "5'11 in - 180 cms", "value": 24 }, { "label": "6'0 in - 183 cms", "title": "6'0 in - 183 cms", "value": 25 },
                { "label": "6'1 in - 185 cms", "title": "6'1 in - 185 cms", "value": 26 }, { "label": "6'2 in - 188 cms", "title": "6'2 in - 188 cms", "value": 27 },
                { "label": "6'3 in - 190 cms", "title": "6'3 in - 190 cms", "value": 28 }, { "label": "6'4 in - 193 cms", "title": "6'4 in - 193 cms", "value": 29 },
                { "label": "6'5 in - 195 cms", "title": "6'5 in - 195 cms", "value": 30 }, { "label": "6'6 in - 198 cms", "title": "6'6 in - 198 cms", "value": 31 },
                { "label": "6'7 in - 200 cms", "title": "6'7 in - 200 cms", "value": 32 }, { "label": "6'8 in - 203 cms", "title": "6'8 in - 203 cms", "value": 33 },
                { "label": "6'9 in - 205 cms", "title": "6'9 in - 205 cms", "value": 34 }, { "label": "6'10 in - 208 cms", "title": "6'10 in - 208 cms", "value": 35 },
                { "label": "6'11 in - 210 cms", "title": "6'11 in - 210 cms", "value": 36 }, { "label": "7'0 in - 213 cms\t", "title": "7'0 in - 213 cms\t", "value": 37 },
                { "label": "7'1 in - 215 cms\t", "title": "7'1 in - 215 cms\t", "value": 38 }, { "label": "7'2 in - 218 cms\t", "title": "7'2 in - 218 cms\t", "value": 39 }
            ],
            "Religion": [
                { "label": "--Select--", "title": "--select--", "value": "" },
                { "label": "Hindu", "title": "Hindu", "value": 1 },
                { "label": "Christian", "title": "Christian", "value": 2 },
                { "label": "Muslim", "title": "Muslim", "value": 3 },
                { "label": "Other", "title": "Other", "value": 6 },
                { "label": "Catholic", "title": "Catholic", "value": 9 },
                { "label": "Roma Catholic", "title": "Roma Catholic", "value": 15 },
                { "label": "ROMAN CATHOLIC", "title": "ROMAN CATHOLIC", "value": 16 }
            ],
            "Mothertongue": [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Telugu", "title": "Telugu", "value": 1 },
                { "label": "Tamil", "title": "Tamil", "value": 2 },
                { "label": "Kannada", "title": "Kannada", "value": 3 },
                { "label": "Hindi", "title": "Hindi", "value": 4 },
                { "label": "Punjabi", "title": "Punjabi", "value": 5 },
                { "label": "Urdu", "title": "Urdu", "value": 6 },
                { "label": "Lambadi", "title": "Lambadi", "value": 7 },
                { "label": "Marati", "title": "Marati", "value": 8 },
                { "label": "Gujaraathi", "title": "Gujaraathi", "value": 9 },
                { "label": "English", "title": "English", "value": 10 },
                { "label": "Malayalam", "title": "Malayalam", "value": 11 },
                { "label": "Saurashtra", "title": "Saurashtra", "value": 12 }, { "label": "Orea", "title": "Orea", "value": 13 },
                { "label": "telugu", "title": "telugu", "value": 14 }
            ],
            "educationcategory": [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Bachelors in Engineering", "title": "Bachelors in Engineering", "value": 1 },
                { "label": "Bachelors in Degree", "title": "Bachelors in Degree", "value": 2 },
                { "label": "Diploma", "title": "Diploma", "value": 3 },
                { "label": "Doctorate/phd", "title": "Doctorate/phd", "value": 4 },
                { "label": "Masters in Engineering", "title": "Masters in Engineering", "value": 5 },
                { "label": "Bachelors in Medicine", "title": "Bachelors in Medicine", "value": 6 },
                { "label": "Masters in Degree", "title": "Masters in Degree", "value": 7 },
                { "label": "Finance - ICWAI/CA/CS", "title": "Finance - ICWAI/CA/CS", "value": 10 },
                { "label": "Union Public Service Commision-Civil Services", "title": "Union Public Service Commision-Civil Services", "value": 11 },
                { "label": "Masters in Medicine", "title": "Masters in Medicine", "value": 13 },
                { "label": "Below Graduation", "title": "Below Graduation", "value": 15 },
                { "label": "Not given", "title": "Not given", "value": 21 },
                { "label": "Other", "title": "Other", "value": 22 }
            ],
            "visastatus": [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Student Visa", "title": "Student Visa", "value": 284 },
                { "label": "Work Permit", "title": "Work Permit", "value": 285 },
                { "label": "Temporary Visa", "title": "Temporary Visa", "value": 286 },
                { "label": "Citizen", "title": "Citizen", "value": 521 },
                { "label": "Permanent Resident", "title": "Permanent Resident", "value": 522 },
                { "label": "Green Card", "title": "Green Card", "value": 553 },
                { "label": "OPT", "title": "OPT", "value": 572 }
            ],
            "stars": [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Bharani", "title": "Bharani", "value": 2 },
                { "label": "Krithika", "title": "Krithika", "value": 3 },
                { "label": "Rohini", "title": "Rohini", "value": 4 },
                { "label": "Mrigasira", "title": "Mrigasira", "value": 5 },
                { "label": "Arudra", "title": "Arudra", "value": 6 },
                { "label": "Punarvasu", "title": "Punarvasu", "value": 7 },
                { "label": "Pushyami", "title": "Pushyami", "value": 8 },
                { "label": "Aslesha", "title": "Aslesha", "value": 9 },
                { "label": "Makha", "title": "Makha", "value": 10 },
                { "label": "Pubba", "title": "Pubba", "value": 11 },
                { "label": "Utharapalguni", "title": "Utharapalguni", "value": 12 },
                { "label": "Hastham", "title": "Hastham", "value": 13 },
                { "label": "Chitta", "title": "Chitta", "value": 14 },
                { "label": "Swathi", "title": "Swathi", "value": 15 },
                { "label": "Vishaka", "title": "Vishaka", "value": 16 },
                { "label": "Anuradha", "title": "Anuradha", "value": 18 },
                { "label": "Jesta", "title": "Jesta", "value": 19 },
                { "label": "Moola", "title": "Moola", "value": 20 },
                { "label": "Poorvashada", "title": "Poorvashada", "value": 21 },
                { "label": "Utharashada", "title": "Utharashada", "value": 22 },
                { "label": "Sravanam", "title": "Sravanam", "value": 23 },
                { "label": "Dhanishta", "title": "Dhanishta", "value": 24 },
                { "label": "Sathabisham", "title": "Sathabisham", "value": 25 },
                { "label": "Poorvabadra", "title": "Poorvabadra", "value": 26 },
                { "label": "Uthirabadra", "title": "Uthirabadra", "value": 27 },
                { "label": "Revathi", "title": "Revathi", "value": 28 },
                { "label": "Anuradha", "title": "Anuradha", "value": 30 },
                { "label": "Arudra", "title": "Arudra", "value": 31 },
                { "label": "Ashwini", "title": "Ashwini", "value": 32 },
                { "label": "Aslesha", "title": "Aslesha", "value": 33 },
                { "label": "Chitra", "title": "Chitra", "value": 34 },
                { "label": "Dhanshita", "title": "Dhanshita", "value": 35 },
                { "label": "Hasta", "title": "Hasta", "value": 36 },
                { "label": "Jyehsta", "title": "Jyehsta", "value": 37 },
                { "label": "Kritika", "title": "Kritika", "value": 38 },
                { "label": "Magha", "title": "Magha", "value": 39 },
                { "label": "Moola", "title": "Moola", "value": 40 },
                { "label": "Mrigasira", "title": "Mrigasira", "value": 41 },
                { "label": "Poorvabhadra", "title": "Poorvabhadra", "value": 42 },
                { "label": "Poorvashadha", "title": "Poorvashadha", "value": 43 },
                { "label": "Punarvasu", "title": "Punarvasu", "value": 44 },
                { "label": "Poorvaphalguni", "title": "Poorvaphalguni", "value": 45 },
                { "label": "Pushya", "title": "Pushya", "value": 46 },
                { "label": "Satabisha", "title": "Satabisha", "value": 47 },
                { "label": "Sravana", "title": "Sravana", "value": 48 },
                { "label": "Swati", "title": "Swati", "value": 49 },
                { "label": "Uttarashadha", "title": "Uttarashadha", "value": 50 },
                { "label": "Uttarabhadrapada", "title": "Uttarabhadrapada", "value": 51 },
                { "label": "Uttaraphalguni", "title": "Uttaraphalguni", "value": 52 },
                { "label": "Visakha", "title": "Visakha", "value": 53 },
                { "label": "Uttara", "title": "Uttara", "value": 54 },
                { "label": "Uttarabhadra", "title": "Uttarabhadra", "value": 55 }
            ],
            'starLanguage': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Telugu", "title": "Telugu", "value": 1 },
                { "label": "Tamil", "title": "Tamil", "value": 2 },
                { "label": "Kannada", "title": "Kannada", "value": 3 },
            ],
            'region': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "AP", "title": "AP", "value": 408 },
                { "label": "TN", "title": "TN", "value": 409 },
                { "label": "KT", "title": "KT", "value": 410 }
            ],
            'bodyType': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Athletic", "title": "Athletic", "value": 21 },
                { "label": "Average", "title": "Average", "value": 22 },
                { "label": "Slim", "title": "Slim", "value": 23 },
                { "label": "Heavy", "title": "Heavy", "value": 24 },
                { "label": "Doesn't Matter", "title": "Doesn't Matter", "value": 37 }
            ],
            'bloodGroup': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "O+", "title": "O+", "value": 61 },
                { "label": "A+", "title": "A+", "value": 63 },
                { "label": "B+", "title": "B+", "value": 64 },
                { "label": "AB+", "title": "AB+", "value": 65 },
                { "label": "O-", "title": "O-", "value": 66 },
                { "label": "A-", "title": "A-", "value": 67 },
                { "label": "B-", "title": "B-", "value": 68 }
            ],
            'healthCondition': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "No Health Problems", "title": "No Health Problems", "value": 220 },
                { "label": "HIV", "title": "HIV", "value": 222 },
                { "label": "Diabetes", "title": "Diabetes", "value": 223 },
                { "label": "LowBP", "title": "LowBP", "value": 224 },
                { "label": "HighBP", "title": "HighBP", "value": 225 },
                { "label": "Heart Ailments", "title": "Heart Ailments", "value": 226 }
            ],
            'lagnam': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Dhansu", "title": "Dhansu", "value": 1 },
                { "label": "Kanya", "title": "Kanya", "value": 2 },
                { "label": "Karkatakam", "title": "Karkatakam", "value": 3 },
                { "label": "Khumbam", "title": "Khumbam", "value": 4 },
                { "label": "Makhram", "title": "Makhram", "value": 5 },
                { "label": "Meenam", "title": "Meenam", "value": 6 },
                { "label": "Mesham", "title": "Mesham", "value": 7 },
                { "label": "Midhunam", "title": "Midhunam", "value": 8 },
                { "label": "Simham", "title": "Simham", "value": 9 },
                { "label": "Thula", "title": "Thula", "value": 10 },
                { "label": "Vrichikam", "title": "Vrichikam", "value": 11 },
                { "label": "Vrushabam", "title": "Vrushabam", "value": 12 }
            ],
            'ZodaicSign': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "mesha", "title": "mesha", "value": 527 },
                { "label": "vrushaba", "title": "vrushaba", "value": 528 },
                { "label": "midhuna", "title": "midhuna", "value": 529 },
                { "label": "karkataka", "title": "karkataka", "value": 530 },
                { "label": "Simha", "title": "Simha", "value": 531 },
                { "label": "Kanya", "title": "Kanya", "value": 532 },
                { "label": "Thula", "title": "Thula", "value": 533 },
                { "label": "Vruchika", "title": "Vruchika", "value": 534 },
                { "label": "Dhanu", "title": "Dhanu", "value": 535 },
                { "label": "Makara", "title": "Makara", "value": 536 },
                { "label": "Kumbha", "title": "Kumbha", "value": 537 },
                { "label": "Meena", "title": "Meena", "value": 538 },
            ],
            'paadam': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "1", "title": "1", "value": 304 },
                { "label": "2", "title": "2", "value": 305 },
                { "label": "3", "title": "3", "value": 306 },
                { "label": "4", "title": "4", "value": 539 },
            ],
            'familyStatus': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Lower Middle Class", "title": "Lower Middle Class", "value": 290 },
                { "label": "Middle Class", "title": "Middle Class", "value": 291 },
                { "label": "Upper Middle Class", "title": "Upper Middle Class", "value": 292 },
                { "label": "Rich", "title": "Rich", "value": 293 },
                { "label": "Affluent", "title": "Affluent", "value": 294 },
                { "label": "Others", "title": "Others", "value": 516 },
                { "label": "High Class", "title": "High Class", "value": 517 }
            ],
            'RelationshipType': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "Friend", "title": "Friend", "value": 318 },
                { "label": "Relative", "title": "Relative", "value": 319 },
                { "label": "Not Given", "title": "Not Given", "value": 549 },

            ],
            "childStayingWith": [
                { "label": "--select-- ", "title": "--select--", "value": 0 },
                { "label": "Father", "title": "Father", "value": 39 },
                { "label": "Mother", "title": "Mother", "value": 40 },
                { "label": "YoungerBrother", "title": "YoungerBrother", "value": 41 },
                { "label": "ElderBrother", "title": "ElderBrother", "value": 42 },
                { "label": "Self", "title": "Self", "value": 283 },
                { "label": "YoungerSister", "title": "YoungerSister", "value": 321 },
                { "label": "ElderSister", "title": "ElderSister", "value": 322 },
                { "label": "FatherYoungerBrother", "title": "FatherYoungerBrother", "value": 323 },
                { "label": "FatherElderBrother", "title": "FatherElderBrother", "value": 324 },
                { "label": "FatherYoungerSister", "title": "FatherYoungerSister", "value": 325 },
                { "label": "FatherElderSister", "title": "FatherElderSister", "value": 326 },
                { "label": "MotherYoungerBrother", "title": "MotherYoungerBrother", "value": 327 },
                { "label": "MotherElderBrother", "title": "MotherElderBrother", "value": 328 },
                { "label": "MotherYoungerSister", "title": "MotherYoungerSister", "value": 329 },
                { "label": "MotherElderSister", "title": "MotherElderSister", "value": 320 },
                { "label": "Spouse", "title": "Spouse", "value": 334 },
                { "label": "XRelation", "title": "XRelation", "value": 554 },
                { "label": "GrandFather", "title": "GrandFather", "value": 556 },
                { "label": "GrandMother", "title": "GrandMother", "value": 557 },
                { "label": "SisterHusband", "title": "SisterHusband", "value": 558 },
                { "label": "Friend", "title": "Friend", "value": 559 },
                { "label": "Relative", "title": "Relative", "value": 560 },
                { "label": "Uncle", "title": "Uncle", "value": 561 },
                { "label": "Aunt", "title": "Aunt", "value": 562 }

            ],
            'newProfessionCatgory': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "state govt job", "title": "state govt job", "value": 567 },
                { "label": "central govt job", "title": "central govt job", "value": 568 },
                { "label": "private job", "title": "private job", "value": 569 },
                { "label": "doctor", "title": "doctor", "value": 570 },
                { "label": "business", "title": "business", "value": 571 }
            ],
            'gradeSelection': [
                { "label": "--Select--", "title": "--Select--", "value": "" },
                { "label": "A", "title": "A", "value": 216 },
                { "label": "B", "title": "B", "value": 217 },
                { "label": "C", "title": "C", "value": 218 },
                { "label": "D", "title": "D", "value": 219 }
            ],
            'Complexion': [
                { "label": "--select-- ", "title": "--select--", "value": "" },
                { "label": "Very Fair", "title": "Very Fair", "value": 17 },
                { "label": "Fair", "title": "Fair", "value": 18 },
                { "label": "Medium", "title": "Medium", "value": 19 },
                { "label": "Dark", "title": "Dark", "value": 20 },
                { "label": "Doesn't Matter", "title": "Doesn't Matter", "value": 38 },
                { "label": "Light Brown", "title": "Light Brown", "value": 573 }
            ],
            'PhysicalStatus': [
                { "label": "--select-- ", "title": "--select--", "value": "" },
                { "label": "Normal", "title": "Normal", "value": 25 },
                { "label": "Physically Challenged", "title": "Physically Challenged", "value": 26 }
            ],
            // added
            'boolType': [
                { "label": "Yes", "title": "Yes", "value": 1 },
                { "label": "No", "title": "No", "value": 0 }
            ],
            'gender': [
                { "label": "Male", "title": "Male", "value": 1 },
                { "label": "Female", "title": "Female", "value": 2 }
            ],
            'Domicile': [
                { "label": "India", "title": "India", "value": 0 },
                { "label": "Abroad", "title": "Abroad", "value": 1 },
                { "label": "Both", "title": "Both", "value": 2 }
            ],
            'Diet': [
                { "label": "Veg", "title": "Veg", "value": 27 },
                { "label": "Non Veg", "title": "Non Veg", "value": 28 },
                { "label": "Both", "title": "Both", "value": 29 }
            ],
            'Kujadosham': [
                { "label": "Yes", "title": "Yes", "value": 0 },
                { "label": "No", "title": "No", "value": 1 },
                { "label": "Does Not Matter", "title": "Does Not Matter", "value": 2 }
            ],
            'preferredStarlanguage': [
                { "label": "Telugu", "title": "Telugu", "value": 1 },
                { "label": "Tamil", "title": "Tamil", "value": 2 },
                { "label": "Kannada", "title": "Kannada", "value": 3 }
            ],
            'StarPreference': [
                { "label": "Preferredstars", "title": "Preferredstars", "value": 0 },
                { "label": "NonPreferredstars", "title": "NonPreferredstars", "value": 1 }
            ],
            'Drink': [
                { "label": "Yes", "title": "Yes", "value": 30 },
                { "label": "No", "title": "No", "value": 31 },
                { "label": "Occasional", "title": "Occasional", "value": 32 }
            ]
        });

}());

// (function(){
//     'use strict';

//     angular
//         .module('module')
//         .constant('constant', constant);

// }());