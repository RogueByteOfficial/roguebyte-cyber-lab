# دليل نشر المشروع على GitHub خطوة بخطوة
## مشروع RogueByte Cyber Lab

* **اسم المشروع:** RogueByte Cyber Lab
* **المؤلف والمطور:** SID AHMED FARES
* **الاسم المستعار:** SidoDev-Dz
* **مالك المستودع على GitHub:** [sidopac1a](https://github.com/sidopac1a)
* **المؤسسة / العلامة:** [RogueByteOfficial](https://github.com/RogueByteOfficial)
* **اسم المستودع المستهدف:** `roguebyte-cyber-lab`
* **الترخيص:** MIT License

---

## مقدمة
يقدم هذا الدليل إرشادات آمنة ودقيقة لنشر كود مشروع **RogueByte Cyber Lab** على منصة **GitHub** دون تسريب أي أسرار أو ملفات حساسة، مع اعتماد هوية المؤلف الرسمية **SID AHMED FARES**.

---

### الخطوة 1: التحقق من إعدادات Git وهوية المؤلف

افتح طرفية النظام (Ubuntu/WSL2 أو PowerShell) وتأكد من ضبط اسمك الرسمي:

```bash
# ضبط اسم المطور الرسمي
git config --global user.name "SID AHMED FARES"

# ضبط البريد الإلكتروني الخاص بك في GitHub (استبدل you@example.com ببريدك الفعلي)
git config --global user.email "you@example.com"

# التحقق من الإعدادات
git config --global user.name
git config --global user.email
```

---

### الخطوة 2: فحص الأمان ومنع تسريب الأسرار (Pre-Commit Security Audit)

قبل أي عملية رفع، تأكد من النقاط التالية:

1. **فحص ملف .gitignore:**
   تأكد من أن ملفات `.env` و `.env.local` ومجلدات `node_modules` و `pgdata` موجودة داخل `.gitignore`.
2. **فحص الملفات غير المتتبعة:**
   نفّذ:
   ```bash
   git status --ignored
   ```
   تأكد من عدم وجود أي مفاتيح خاصة (`*.pem`, `*.key`) أو ملف `.env` ضمن الملفات المهيأة للإضافة.
3. **فحص عدم وجود أسرار في الكود:**
   استخدم الأمر التالي للبحث عن أي كلمات سرية محتملة:
   ```bash
   grep -ri "password=" --exclude-dir=node_modules --exclude-dir=.git .
   ```
   يجب ألا تظهر سوى القيم الافتراضية في `.env.example`.

---

### الخطوة 3: إنشاء المستودع على حساب GitHub

1. سجّل الدخول إلى حسابك [sidopac1a](https://github.com/sidopac1a) أو مؤسسة [RogueByteOfficial](https://github.com/RogueByteOfficial).
2. اضغط على **New Repository**.
3. املأ البيانات:
   * **Repository Name:** `roguebyte-cyber-lab`
   * **Description:** `An educational, isolated cybersecurity training platform for ethical hacking, web security, and Linux defense.`
   * **Visibility:** Public أو Private بحسب رغبتك.
   * **Initialize with:** اتركه فارغاً (لا تختر Add README أو Add .gitignore لأنها موجودة وجاهزة بالفعل في المشروع).
4. اضغط **Create repository**.

---

### الخطوة 4: تهيئة المستودع المحلي وإنشاء أول Commit

داخل مجلد المشروع:

```bash
# 1. تهيئة Git في حال لم تكن مهيأة
git init

# 2. التأكد من تسمية الفرع الرئيسي main
git branch -M main

# 3. إضافة جميع الملفات المصرح بها
git add .

# 4. التحقق من قائمة الملفات المراد تثبيتها
git status

# 5. إنشاء الـ Commit الأول باسم واضح ومعبر
git commit -m "feat: initial release of RogueByte Cyber Lab by SID AHMED FARES"
```

---

### الخطوة 5: ربط المستودع المحلي بمستودع GitHub البعيد

اختر إحدى طريقتي الربط الآمنتين:

#### الطريقة أ: باستخدام بروتوكول HTTPS (الأسهل والموصى بها مع GitHub CLI أو Credential Manager)

```bash
git remote add origin https://github.com/sidopac1a/roguebyte-cyber-lab.git
```
*(أو استبدل `sidopac1a` بـ `RogueByteOfficial` إذا تم إنشاء المستودع تحت حساب المؤسسة).*

#### الطريقة ب: باستخدام مفتاح SSH (الأكثر أماناً للمطورين المحترفين)

إذا كان لديك مفتاح SSH مضاف في حسابك على GitHub:
```bash
git remote add origin git@github.com:sidopac1a/roguebyte-cyber-lab.git
```

---

### الخطوة 6: رفع الكود إلى GitHub (Push)

```bash
git push -u origin main
```

عند المطالبة بالمصادقة:
* إذا كنت تستخدم **GitHub CLI (`gh auth login`)**: ستتم المصادقة عبر المتصفح تلقائياً.
* إذا طُلب منك كلمة مرور عبر HTTPS: استخدم **Personal Access Token (PAT)** بصلاحية `repo` تم إنشاؤه من إعدادات حسابك على GitHub (Settings > Developer Settings > Personal Access Tokens). **لا تشارك هذا الرمز في أي محادثة أو ملف عام**.

---

### الخطوة 7: التحقق من نجاح الرفع

1. افتح صفحة المستودع على المتصفح:
   `https://github.com/sidopac1a/roguebyte-cyber-lab`
2. تأكد من ظهور ملفات:
   * `README.md` مع اسم المؤلف وبيانات الترخيص.
   * `AUTHORS.md` و `LICENSE`.
   * مجلد `docs/` و `src/`.
   * عدم ظهور أي ملف `.env` سري.

---

### الخطوة 8: تحديث المشروع مستقبلاً

عند إضافة ميزات جديدة أو إصلاح ثغرات:

```bash
# التحقق من الملفات المعدلة
git status

# إضافة التعديلات
git add .

# إنشاء commit جديد يصف التغيير
git commit -m "feat(labs): add advanced network packet inspection challenges"

# رفع التحديثات إلى الفرع الرئيسي
git push origin main
```

---
**RogueByte Cyber Lab** — الحقوق محفوظة للمهندس **SID AHMED FARES (SidoDev-Dz)** © 2026.
