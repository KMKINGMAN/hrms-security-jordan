import * as yup from "yup";

const JordanianCitys = [
    'عمان',
    'الزرقاء',
    'اربد',
    'الرصيفة',
    'السحاب',
    'الرمثا',
    'العقبة',
    'مخيم الزعتري للاجئين',
    'المفرق',
    'مادبا',
    'السلط',
    'الجيزة',
    "مخيم البقعة للاجئين",
    'عين الباشا',
    'عيدون',
    'مخيم ماركا للاجئين',
    'الضليل',
    'جرش',
    'الصريح',
    'الهاشمية',
    "معان",
    'بيت راس',
    'الحسن',
    'مخيم الازرق للاجئين',
    'الطرة',
    'ناحية عمان الجديدة',
    'ام قيس',
    'تلاع العلي',
    'السواقنة',
    'ماحص',
    'عرجان',
    'عجلون',
    'رمثا البلد',
    "غير ذالك"
];

const MilitaryRanks = [
    "مشير",
    "فريق أول",
    "فريق",
    "لواء",
    "عميد",
    "عقيد",
    "مقدم",
    "رائد",
    "نقيب",
    "ملازم أول",
    "ملازم",
    "تلميذ مرشح"
];
const eduLevels =  [  
    'أمي/ة',
    'ابتدائية',
    'متوسطة',
    'ثانوية',
    'دبلوم',
    'بكالوريوس',
    'ماجستير',
    'دكتوراة'
];
const eduDegrees = [
    "ممتاز", 
    "جيد جدا", 
    "جيد", 
    "متوسط", 
    "مقبول",
    "ضعيف", 
    "ضعيف جدا", 
    "راسب"
];
const NationsList = [
    "أردني", "فلسطيني", "سوري", "لبناني", "مصري", "عراقي", 
    "سوداني", "يمني", "ليبي", "تونسي", "جزائري", "مغربي", "قطري",
     "كويتي", "إماراتي", "بحريني", "عماني", "سعودي", "جنوب أفريقي", 
     "أمريكي", "كندي", "بريطاني", "فرنسي", "ألماني", "إيطالي", "إسباني", 
     "تركي", "صيني", "روسي", "ياباني", "أسترالي", "هندي", "باكستاني", "بنغالي", 
     "فيتنامي", "فلبيني", "إندونيسي", "تايلاندي", "كوري جنوبي", "ماليزي", "نيبالي", 
     "سريلانكي", "أثيوبي", "إريتري", "صومالي", "جنوب سوداني", "كونغوليزي", "غاني", "نيجيري",
      "سنغالي", "موريتاني", "مالي", "نيجيريا الجديدة", "بوركينا فاسو", "كيني", 
      "تنزاني", "أوغندي", "راوندي", "بوروندي", "زامبيا", "زمبابوي", 
      "موزمبيقي", "جنوب إفريقي", "كاميروني", "تشادي", "نيجيريا", "أنغولي", "كابو فردياني", "غينيا الاستوائية",
       "غينيا البيساو", "غينيا", "سيراليوني", "ليبيري", "كوت ديفوار", "غابوني",
        "الكونغو الديمقراطية", "كونغو", "توغو", "بنيني", "ساوتومي وبرينسيبي", "جزر القمر", 
        "جزر الرأس الأخضر", "غامبيا", "الموريسي", "السيشيلي", "مدغشقر", "مالاوي", "لوسوتو", 
        "سوازيلاند", "بوتسوانا", "إثيوبيا", "جيبوتي", "الصومال"
];
const SocialStatuses = [
    'أعزب',
    'متزوج',
    'أرمل',
    'مطلق',
    'منفصل',
    'منتهية الصلاحية'
];
const Religions = [
    "إسلام",
    "مسيحية",
    "يهودية",
    "درزية",
    "طائفة الصابئة المندائية",
    "بهائية",
    "الحالة غير معروفة"
];
const terminationReasons = [
    "انتهاء فترة العقد",
    "إنهاء الخدمات بالاتفاق المتبادل",
    "فسخ العقد من قبل الطرف الآخر",
    "الإفراط في الغياب عن العمل",
    "عدم الالتزام بالأداء المطلوب",
    "مخالفة قواعد العمل أو الأنظمة الداخلية",
    "تقديم معلومات كاذبة أو تضليلية",
    "تقصير في الأداء المهني",
    "التعرض لزملاء العمل أو العاملين في الجهة",
    "استخدام المواد المخدرة أو الكحولية خلال ساعات العمل",
    "ارتكاب جرائم في مقر العمل",
    "التأخير في الحضور إلى العمل بشكل مستمر",
    "التسبب في أضرار مادية للجهة",
    "التصرف بطريقة غير مهنية أو غير أخلاقية",
    "عدم تحقيق الأهداف المحددة للعمل",
    "استخدام المعلومات أو الخدمات الخاصة بالجهة بشكل غير مصرح به",
    "التحرش أو الإساءة للزملاء أو العاملين في الجهة",
    "الإفصاح عن معلومات سرية أو خاصة بالجهة بدون إذن",
    "عدم التزام باللوائح والقوانين الخاصة بالجهة",
    "إخفاء المعلومات أو البيانات المطلوبة",
    "تقديم خدمات أو منتجات غير مصرح بها بأسم الجهة",
    "تداول أو استعمال المعلومات أو الوثائق بدون إذن",
    "عدم التعاون مع الجهات المختصة في التحقيق في شأن مهمات العمل"
  ];   
const EmployeeSchema = (data) => {
    return yup.object().shape({
        firstName: yup.string().required("الاسم الاول مهم"),
        fatherName: yup.string().required("اسم الاب مهم"),
        grandFatherName: yup.string().required("اسم الجد مهم"),
        familyName: yup.string().required("اسم العائلة مهمة "),
        DOB: yup.date().required("تاريخ الميلاد مهم"),
        motherName: yup.string().required("اسم الام مهم "),
        bornPlace: yup.string().required("Required").oneOf(JordanianCitys, "مكان الولادة مهم"),
        nationility: yup.string().required().oneOf(NationsList, "الجنسية مهمة"),
        relationStatus: yup.string().required("Required").oneOf(SocialStatuses, "الحالة الاجتماعية مهمة "),
        religeon: yup.string().required("Required").oneOf(Religions, "الديانة مهمة"),
        IDNumber: yup.string().required("رقم الوطني مهم"),
        mainPhoneNumber: yup.string().required("الهاتف الاساسي مهم"),
        otherPhoneNumber: yup.string().required("الهاتف البديل مهم"),
        latestAcademic: yup.string().required("Required").oneOf(eduLevels, "اخر مؤهل علمي مهم"),
        acadmicDegress: yup.string().when('latestAcademic', {
            is: (value) => value !== 'أمي/ة',
            then: yup.string().required().oneOf(eduDegrees, "التفييم الاكاديمي مهم"),
            otherwise: yup.string().notRequired(),
        }),
        studyPlace: yup.string().when('latestAcademic', {
            is: (value) => value !== 'أمي/ة',
            then: yup.string().required("مكان الدراسة مهم"),
            otherwise: yup.string().notRequired()
        }),
        LanguagesKnowlage: yup.string().required("Required").oneOf(eduDegrees, "درجات غير صحيحة"),
        skills: yup.array().notRequired(),
        military: yup.boolean().required("Required"),
        militaryID: yup.string().when("military", { is: true, then: yup.string().required("الرقم العسكري مهم"), otherwise: yup.string().notRequired() }),
        militaryRole: yup.string().when("military", { is: true, then: yup.string().required("الرتب العسكرية مهمة").oneOf(MilitaryRanks, "Not Vaild "), otherwise: yup.string().notRequired() }),
        workInOtherCompany: yup.boolean().required("Required"),
        workPlace: yup.string().when("workInOtherCompany", { is: true, then: yup.string().required("مكان العمل القديم مهم"), otherwise: yup.string().notRequired() }),
        otherCompanySalary: yup.number().when("workInOtherCompany", { is: true, then: yup.number().required("الراتب مهم"), otherwise: yup.number().notRequired() }),
        leaveReason: yup.string().when("workInOtherCompany", { is: true, then: yup.string().required(), otherwise: yup.string().notRequired() }),
        salary: yup.number().required("الراتب مهم"),
        company_name: yup.string().oneOf(data.companys_full.map(c => c.name)).notRequired(),
        website_username: yup.string().notOneOf(data.webusernames, "اسم مستخدم").required("اسم المستخدم مهم"),
        website_password: yup.string().required("كلمة المرور مهمة"),
        website_account_type: yup.string().oneOf(["0", "1", "2", "3", "4"], "نوع حساب غير صالح").required("نوع الحساب مهم"),
        time_goup: yup.string().oneOf(["صباحي", "مسائي"], "وقت عمل غير صالح").notRequired(),
    });
};

const EmployeeinitialValues = {
    firstName: '',
    fatherName: '',
    grandFatherName: '',
    familyName: '',
    DOB: '',
    motherName: '',
    bornPlace: '',
    nationility: '',
    relationStatus: '',
    religeon: '',
    IDNumber: '',
    mainPhoneNumber: '',
    otherPhoneNumber: '',
    latestAcademic: '',
    acadmicDegress: '',
    studyPlace: '',
    LanguagesKnowlage: '',
    skills: [],
    military: false,
    militaryID: '',
    militaryRole: '',
    workInOtherCompany: false,
    workPlace: '',
    otherCompanySalary: 0,
    leaveReason: '',
    salary: 0,
    company_name: '',
    website_username: '',
    website_password: '',
    website_account_type: '',
    time_goup: '',
}
export {
    JordanianCitys,
    MilitaryRanks,
    eduLevels,
    eduDegrees,
    NationsList,
    SocialStatuses,
    Religions,
    EmployeeinitialValues, 
    EmployeeSchema,
    terminationReasons
}