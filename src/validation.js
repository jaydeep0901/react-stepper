function validateEmail(email) {
    return (/^\w+([.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email));
}

function validatePanCard(pan_number) {
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    return regpan.test(pan_number)
}

function validateEducation(cur_emp) {

    let errors = {
        failed: false,
        education: []
    }

    if (cur_emp.education !== undefined && Array.isArray(cur_emp.education)) {
        for (let i = 0; i < cur_emp.education.length; i++) {
            let cur_edu = cur_emp.education[i];
            let cur_errors = {
                failed: false
            }
            if (cur_edu.course_name === undefined || cur_edu.course_name === '') {
                cur_errors.course_name = 'Please enter course name'
                cur_errors.failed = true;
                errors.failed = true;
            }
            if (cur_edu.university_name === undefined || cur_edu.university_name === '') {
                cur_errors.university_name = 'Please enter university name'
                cur_errors.failed = true;
                errors.failed = true;
            }
            if (cur_edu.grade === undefined || cur_edu.grade === '') {
                cur_errors.grade = 'Please enter grade'
                cur_errors.failed = true;
                errors.failed = true;
            }
            if (cur_edu.last_date === undefined) {
                cur_errors.last_date = 'Please select last date'
                cur_errors.failed = true;
                errors.failed = true;
            }
            errors.education.push(cur_errors);
        }
    }

    return errors;
}

function validateExperience(cur_emp) {
    let errors = {
        failed: false,
        experience: []
    }

    if (cur_emp.experience !== undefined && Array.isArray(cur_emp.experience)) {
        for (let i = 0; i < cur_emp.experience.length; i++) {
            let cur_exp = cur_emp.experience[i];
            let cur_errors = {
                failed: false
            }
            if (cur_exp.company_name === undefined || cur_exp.company_name === '') {
                cur_errors.company_name = 'Please enter company name'
                cur_errors.failed = true;
                errors.failed = true;
            }
            if (cur_exp.designation === undefined || cur_exp.designation === '') {
                cur_errors.designation = 'Please enter designation'
                cur_errors.failed = true;
                errors.failed = true;
            }
            if (cur_exp.department === undefined || cur_exp.department === '') {
                cur_errors.department = 'Please enter department'
                cur_errors.failed = true;
                errors.failed = true;
            }
            if (cur_exp.ctc === undefined || cur_exp.ctc === '') {
                cur_errors.ctc = 'Please enter ctc'
                cur_errors.failed = true;
                errors.failed = true;
            } else if (isNaN(cur_exp.ctc)) {
                cur_errors.ctc = 'Please enter valid ctc'
                cur_errors.failed = true;
                errors.failed = true;
            }

            if (cur_exp.join_date === undefined) {
                cur_errors.join_date = 'Please select join date'
                cur_errors.failed = true;
                errors.failed = true;
            }
            if (cur_exp.last_date === undefined) {
                cur_errors.last_date = 'Please select last date'
                cur_errors.failed = true;
                errors.failed = true;
            }
            errors.experience.push(cur_errors);
        }
    }

    return errors;
}

function validateCurrentStatus(cur_emp) {
    let errors = {
        failed: false
    }
    if (cur_emp.company_name === undefined || cur_emp.company_name === '') {
        errors.company_name = 'Please enter company name'
        errors.failed = true;
    }
    if (cur_emp.designation === undefined || cur_emp.designation === '') {
        errors.designation = 'Please enter designation'
        errors.failed = true;
    }
    if (cur_emp.department === undefined || cur_emp.department === '') {
        errors.department = 'Please enter department'
        errors.failed = true;
    }
    if (cur_emp.ctc === undefined || cur_emp.ctc === '') {
        errors.ctc = 'Please enter ctc'
        errors.failed = true;
    } else if (isNaN(cur_emp.ctc)) {
        errors.ctc = 'Please enter valid ctc'
        errors.failed = true;
    }

    if (cur_emp.join_date === undefined) {
        errors.join_date = 'Please select join date'
        errors.failed = true;
    }
    return errors;
}
function validateProfessionalDetails(cur_emp) {
    let errors = {
        failed: false
    }
    if (cur_emp.exp_year === undefined) {
        errors.exp_year = "Please enter years";
        errors.failed = true;
    }
    if (cur_emp.exp_month === undefined) {
        errors.exp_month = "Please enter month";
        errors.failed = true;
    }
    if (cur_emp.skills === undefined || cur_emp.skills.length === 0) {
        errors.skills = "Please select one skill";
        errors.failed = true;
    }
    return errors;
}

function validatePersonalDetails(cur_emp) {
    let errors = {
        failed: false
    }
    if (cur_emp.first_name === undefined) {
        errors.first_name = "Please enter first name";
        errors.failed = true;
    } else if (cur_emp.first_name.length < 5) {
        errors.first_name = "First name must be 5 characters long";
        errors.failed = true;
    }
    if (cur_emp.last_name === undefined) {
        errors.last_name = "Please enter last name";
        errors.failed = true;
    } else if (cur_emp.last_name.length < 5) {
        errors.last_name = "Last name must be 5 characters long";
        errors.failed = true;
    }
    //validate date,emp must be 18 + old
    if (cur_emp.date_of_birth !== undefined) {
        let today = new Date();
        //since we are storng date object in dob ,we dont need to parse it
        let age = today.getFullYear() - cur_emp.date_of_birth.getFullYear();
        if (age < 18) {
            errors.date_of_birth = 'Invalide date, employee age must be >=18 years';
            errors.failed = true;
        }
    } else {
        errors.date_of_birth = 'Please select Date of birth';
    }
    if (cur_emp.phone !== undefined && cur_emp.phone !== '') {
        //when phone is given,validate phone
        if (cur_emp.phone.length === 0 || cur_emp.phone.length < 10 || isNaN(cur_emp.phone)) {
            errors.phone = 'Invalid phone number'
            errors.failed = true;
        }
    } else {
        //when phone is not given,validate email
        if (cur_emp.email === undefined || cur_emp.email.length === 0) {
            //email is not given
            errors.email = 'Either phone or email is required';
            errors.phone = 'Either phone or email is required';
            errors.failed = true
        } else {
            //email is given check for email format
            if (!validateEmail(cur_emp.email)) {
                //email is not valid
                errors.email = 'Invalid email address';
                errors.failed = true
            }
        }
    }
    return errors;
}
function validateBankDetails(cur_emp) {
    let errors = {
        failed: false
    }
    if (cur_emp.account_number === undefined || cur_emp.account_number.length === 0) {
        errors.account_number = 'Please enter bank account number';
        errors.failed = true;
    }

    if (cur_emp.ifsc_code === undefined || cur_emp.ifsc_code.length === 0) {
        errors.ifsc_code = 'Please enter IFSC Code';
        errors.failed = true;
    }

    if (cur_emp.pan_number === undefined || cur_emp.pan_number.length === 0) {
        errors.pan_number = 'Please enter PAN Card Number';
        errors.failed = true;
    } else if (!validatePanCard(cur_emp.pan_number)) {
        errors.pan_number = 'Please enter valid PAN Card Number';
        errors.failed = true;
    }

    if (cur_emp.aadhar_number === undefined || cur_emp.aadhar_number.length === 0) {
        errors.aadhar_number = 'Please enter Aadhar Number';
        errors.failed = true;
    } else if (isNaN(cur_emp.aadhar_number) || cur_emp.aadhar_number.length < 12) {
        errors.aadhar_number = 'Please enter valid Aadhar Number';
        errors.failed = true;
    }
    return errors;
}

export default function validate(cur_emp = {}, step = 0) {

    let validators = [validatePersonalDetails, validateBankDetails, validateProfessionalDetails, validateCurrentStatus, validateExperience, validateEducation];

    if (validators[step] === undefined) return {}

    return validators[step](cur_emp);
}