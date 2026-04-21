export const servicesData = [
  // E-Services
  { 
    id: 1, 
    category: "E-Service", 
    title: "First Graduate Certificate", 
    titleUpper: "FIRST GRADUATE CERTIFICATE", 
    language: "English", 
    bgClass: "bg-gradient-to-br from-teal-700 to-teal-900",
    description: "A First Graduate Certificate is an official document that certifies an individual as the first person in their family to graduate from college. This certificate is often required to avail of specific educational benefits, scholarships, and fee concessions.",
    amount: "₹100.00",
    noOfDocuments: "10",
    estimatedTime: "30 mins",
    processingTime: "10-15 Days",
    documentsRequired: [
      "Applicant Photo",
      "Applicant Aadhar Card",
      "Smart Card",
      "Applicant Transfer Certificate",
      "Applicant Marksheet",
      "Applicant Brother / Sister TC & Marksheet",
      "Applicant அம்மா அப்பா பையர், வயது மற்றும் படிப்பு",
      "Applicant அப்பாவின் அம்மா அப்பா, பையர் வயது மற்றும் படிப்பு",
      "Applicant அம்மாவின் அம்மா அப்பா, பையர் வயது மற்றும் படிப்பு",
      "Applicant Signature"
    ]
  },
  { 
    id: 2, 
    category: "E-Service", 
    title: "Indira Gandhi National Old Age Pension Scheme", 
    titleUpper: "INDIRA GANDHI OLD AGE PENSION SHEME", 
    language: "English", 
    bgClass: "bg-gradient-to-br from-green-600 to-green-800",
    description: "The Indira Gandhi National Old Age Pension Scheme provides financial assistance to elderly individuals living below the poverty line. It aims to provide social security and support for senior citizens.",
    amount: "₹100.00",
    noOfDocuments: "5",
    estimatedTime: "30 mins",
    processingTime: "10-15 Days",
    documentsRequired: [
      "Applicant Photo",
      "Applicant Aadhar Card",
      "Smart Card",
      "Age Proof Certificate",
      "Income Certificate"
    ]
  },
  { 
    id: 3, 
    category: "E-Service", 
    title: "Income Certificate", 
    titleUpper: "INCOME CERTIFICATE", 
    language: "English", 
    bgClass: "bg-gradient-to-br from-purple-600 to-purple-800",
    description: "An Income Certificate is an official statement provided by the state government confirming the annual income of a person or a family. It is generally required to claim scholarships or fee concessions.",
    amount: "₹60.00",
    noOfDocuments: "4",
    estimatedTime: "20 mins",
    processingTime: "7-10 Days",
    documentsRequired: [
      "Applicant Photo",
      "Applicant Aadhar Card",
      "Smart Card",
      "Salary Slip / IT Return"
    ]
  },
  { 
    id: 4, 
    category: "E-Service", 
    title: "Deserted Woman Certificate", 
    titleUpper: "DESERTED WOMAN CERTIFICATE", 
    language: "English", 
    bgClass: "bg-gradient-to-br from-gray-800 to-black",
    description: "This certificate is issued to women who have been deserted by their husbands, to help them avail various welfare schemes and financial assistance from the government.",
    amount: "₹60.00",
    noOfDocuments: "6",
    estimatedTime: "30 mins",
    processingTime: "10-15 Days",
    documentsRequired: [
      "Applicant Photo",
      "Applicant Aadhar Card",
      "Smart Card",
      "Marriage Certificate",
      "FIR or Legal Document showing desertion",
      "Applicant Signature"
    ]
  },
  { id: 5, category: "E-Service", title: "Inter-caste Marriage certificate", titleUpper: "INTER-CAST MARRIAGE CERTIFICATE", language: "English", bgClass: "bg-gradient-to-br from-orange-500 to-orange-700", description: "Certificate for inter-caste marriages, required for government benefits and incentives.", amount: "₹100.00", noOfDocuments: "5", estimatedTime: "30 mins", processingTime: "10-15 Days", documentsRequired: ["Applicant Photo", "Applicant Aadhar Card", "Spouse Aadhar Card", "Marriage Registration Certificate", "Community Certificates of both"] },
  { id: 6, category: "E-Service", title: "Family Migration Certificate", titleUpper: "FAMILY MIGRATION CERTIFICATE", language: "English", bgClass: "bg-gradient-to-br from-gray-500 to-gray-700", description: "Issued when a family relocates to a new region, useful for transferring benefits and registrations.", amount: "₹100.00", noOfDocuments: "4", estimatedTime: "20 mins", processingTime: "7-10 Days", documentsRequired: ["Head of Family Photo", "Aadhar Cards of all members", "Smart Card", "Proof of New Address"] },
  { id: 7, category: "E-Service", title: "Other Backward Classes (OBC) Certificate", titleUpper: "OBC CERTIFICATE", language: "English", bgClass: "bg-gradient-to-br from-fuchsia-600 to-purple-700", description: "Proof of belonging to the OBC category for educational and employment reservations.", amount: "₹60.00", noOfDocuments: "5", estimatedTime: "20 mins", processingTime: "7-15 Days", documentsRequired: ["Applicant Photo", "Applicant Aadhar Card", "Smart Card", "School TC", "Parent's Community Certificate"] },
  { id: 8, category: "E-Service", title: "Widow Certificate", titleUpper: "WIDOW CERTIFICATE", language: "English", bgClass: "bg-gradient-to-br from-purple-800 to-purple-900", description: "Provides financial aid and welfare scheme eligibility for widowed women.", amount: "₹60.00", noOfDocuments: "5", estimatedTime: "30 mins", processingTime: "10-15 Days", documentsRequired: ["Applicant Photo", "Applicant Aadhar Card", "Smart Card", "Husband's Death Certificate", "Legal Heir Certificate"] },
  { id: 9, category: "E-Service", title: "No Male Child Certificate", titleUpper: "NO MALE CHILD CERTIFICATE", language: "English", bgClass: "bg-gradient-to-br from-red-800 to-red-950", description: "Required for specific welfare schemes for families with only female children.", amount: "₹60.00", noOfDocuments: "4", estimatedTime: "20 mins", processingTime: "10-15 Days", documentsRequired: ["Parents Photo", "Aadhar Cards of Parents", "Smart Card", "Birth Certificates of Children"] },
  { id: 10, category: "E-Service", title: "Community Certificate", titleUpper: "COMMUNITY CERTIFICATE", language: "English", bgClass: "bg-gradient-to-br from-gray-800 to-gray-900 text-red-500", description: "Official proof of one's caste or community for reservation benefits.", amount: "₹60.00", noOfDocuments: "4", estimatedTime: "20 mins", processingTime: "7-15 Days", documentsRequired: ["Applicant Photo", "Applicant Aadhar Card", "Smart Card", "School TC or Parent's Certificate"] },
  { id: 11, category: "E-Service", title: "Nativity Certificate", titleUpper: "NATIVITY CERTIFICATE", language: "English", bgClass: "bg-gradient-to-br from-red-600 to-red-700 text-yellow-400", description: "Certifies that a person has been residing in a specific state for a minimum required period.", amount: "₹60.00", noOfDocuments: "5", estimatedTime: "30 mins", processingTime: "10-15 Days", documentsRequired: ["Applicant Photo", "Applicant Aadhar Card", "Smart Card", "Birth Certificate", "Property Tax / EB Bill"] },
  { id: 12, category: "E-Service", title: "Unemployment Certificate", titleUpper: "UNEMPLOYMENT CERTIFICATE", language: "English", bgClass: "bg-gradient-to-br from-orange-600 to-orange-700", description: "Issued to educated unemployed youth for government aid and special schemes.", amount: "₹60.00", noOfDocuments: "4", estimatedTime: "20 mins", processingTime: "10 Days", documentsRequired: ["Applicant Photo", "Applicant Aadhar Card", "Employment Exchange ID", "Educational Certificates"] },
  
  // Card Services
  { id: 13, category: "Card Service", title: "PAN Card Application", titleUpper: "PAN CARD APPLICATION", language: "English", bgClass: "bg-gradient-to-br from-blue-600 to-blue-800", description: "Apply for a new Permanent Account Number (PAN) card for financial transactions and tax purposes.", amount: "₹250.00", noOfDocuments: "3", estimatedTime: "15 mins", processingTime: "15-20 Days", documentsRequired: ["Applicant Photo", "Applicant Aadhar Card", "Signature"] },
  { id: 14, category: "Card Service", title: "Voter ID Registration", titleUpper: "VOTER ID REGISTRATION", language: "English", bgClass: "bg-gradient-to-br from-blue-700 to-blue-900", description: "Register as a new voter and obtain an Electoral Photo Identity Card (EPIC).", amount: "₹50.00", noOfDocuments: "3", estimatedTime: "20 mins", processingTime: "30 Days", documentsRequired: ["Applicant Photo", "Applicant Aadhar Card", "Address Proof"] },
  { id: 15, category: "Card Service", title: "Aadhaar Card Update", titleUpper: "AADHAAR CARD UPDATE", language: "English", bgClass: "bg-gradient-to-br from-yellow-500 to-yellow-600", description: "Update demographic or biometric details on your existing Aadhaar Card.", amount: "₹100.00", noOfDocuments: "2", estimatedTime: "15 mins", processingTime: "7-10 Days", documentsRequired: ["Existing Aadhar Card", "Valid Supporting Document for Update"] },
  { id: 16, category: "Card Service", title: "Smart Card Services", titleUpper: "SMART CARD SERVICES", language: "English", bgClass: "bg-gradient-to-br from-green-500 to-green-700", description: "Apply for a new family Smart Card or make corrections to an existing one.", amount: "₹60.00", noOfDocuments: "3", estimatedTime: "20 mins", processingTime: "15 Days", documentsRequired: ["Head of Family Photo", "Aadhar Cards of all members", "Address Proof"] },

  // Bank Services
  { id: 17, category: "Bank Service", title: "Account Opening", titleUpper: "ACCOUNT OPENING", language: "English", bgClass: "bg-gradient-to-br from-teal-500 to-teal-700", description: "Open a new savings or current bank account quickly and securely.", amount: "₹0.00", noOfDocuments: "4", estimatedTime: "30 mins", processingTime: "Immediate", documentsRequired: ["Applicant Photo", "Applicant Aadhar Card", "PAN Card", "Initial Deposit Amount"] },
  { id: 18, category: "Bank Service", title: "Money Transfer", titleUpper: "MONEY TRANSFER", language: "English", bgClass: "bg-gradient-to-br from-indigo-500 to-indigo-700", description: "Securely transfer money to any bank account across the country.", amount: "Varies", noOfDocuments: "2", estimatedTime: "10 mins", processingTime: "Immediate", documentsRequired: ["Sender Aadhar/ID", "Recipient Account Details"] },
  { id: 19, category: "Bank Service", title: "Loan Application", titleUpper: "LOAN APPLICATION", language: "English", bgClass: "bg-gradient-to-br from-red-500 to-red-700", description: "Apply for personal, agricultural, or business loans with competitive rates.", amount: "₹500.00", noOfDocuments: "6", estimatedTime: "45 mins", processingTime: "15-30 Days", documentsRequired: ["Applicant Photo", "Applicant Aadhar Card", "PAN Card", "Income Proof / IT Returns", "Bank Statements", "Property Documents (if applicable)"] },
  { id: 20, category: "Bank Service", title: "Cash Withdrawal", titleUpper: "CASH WITHDRAWAL", language: "English", bgClass: "bg-gradient-to-br from-gray-700 to-gray-900", description: "Withdraw cash easily using Micro-ATM and AePS services.", amount: "₹0.00", noOfDocuments: "2", estimatedTime: "5 mins", processingTime: "Immediate", documentsRequired: ["Aadhar Card linked to Bank", "Biometric Authentication"] },
];
