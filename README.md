# RogueByte Cyber Lab 🛡️⚡
> **منصة تدريبية متكاملة ومتقدمة في أمن المعلومات واختبار الاختراق الأخلاقي والدفاع السيبراني**  
> An Advanced Educational Cybersecurity Laboratory & Defensive Training Platform.

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-WSL2%20%7C%20Linux%20%7C%20Docker-blue.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](#)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933.svg)](#)

---

## 👨‍💻 بيانات المطور وحقوق الملكية (Author Information)

* **المطور والمصمم الرئيسي (Lead Architect & Developer):** **SID AHMED FARES**
* **الاسم المستعار (Developer Alias):** **SidoDev-Dz**
* **المؤسسة والعلامة البرمجية (Brand / Org):** **RogueByte**
* **حساب GitHub الشخصي:** [@sidopac1a](https://github.com/sidopac1a)
* **المستودع الرسمي:** [RogueByteOfficial/roguebyte-cyber-lab](https://github.com/RogueByteOfficial/roguebyte-cyber-lab)
* **دعم المشروع عبر Ko-fi:** [https://ko-fi.com/roguebyte](https://ko-fi.com/roguebyte)
* **الترخيص (License):** [MIT License](LICENSE)

---

## 📖 نظرة عامة على المشروع (Project Overview)

منصة **RogueByte Cyber Lab** هي بيئة تعليمية تفاعلية تم تصميمها لتمكين طلاب الأمن السيبراني وهواة اختبار الاختراق والفرق الزرقاء (Blue Teams) من ممارسة المهارات العملية في بيئة محاكاة واقعية، معزولة تماماً وآمنة وفق مبادئ هندسة البرمجيات الدفاعية (DevSecOps).

تتميز المنصة بفصل كامل بين واجهة الإدارة والتحكم وشبكة الأهداف المعرضة للاختبار، وتوفير آليات إعادة ضبط تلقائية (Reset) تضمن تنظيف البيئة بعد كل تمرين دون فقدان بيانات الطالب الأكاديمية ونتائجه.

### 🌟 أبرز الميزات:
1. **واجهة مستخدم احترافية وحديثة:** متجاوبة مع الحواسيب والهواتف، تدعم الوضع الليلي والنهاري، ثنائية اللغة (العربية والإنجليزية)، خالية من الحشو الزائف ومصممة وفق أرقى معايير واجهات المنصات الأمنية.
2. **نظام صلاحيات متعدد الأدوار (RBAC):**
   * **طالب (Student):** إدارة مختبراته الخاصة، تسليم الأعلام (Flags)، متابعة التقدم والنقاط.
   * **مدرب (Instructor):** تقييم الطلاب، إدارة التحديات، مراقبة استهلاك الموارد.
   * **مسؤول (Administrator):** التحكم بالبنية التحتية، مراجعة سجلات التدقيق (Audit Logs)، إدارة حصص الموارد ومراقبة أمان الشبكات المعزولة.
3. **مختبرات تدريبية عملية وتفاعلية:**
   * **أمن الويب (Web Security):** محاكاة تفاعلية لتطبيقات الويب المصابة بثغرات SQL Injection، XSS، IDOR، و Broken Auth.
   * **أمن أنظمة Linux (Linux Security):** طرفية تحكم تفاعلية مع نظام ملفات محاكى لاكتشاف ثغرات رفع الصلاحيات (SUID Privilege Escalation, Sudo Rights).
   * **أمن الشبكات (Network Security):** محلل حزم تفاعلي لتحليل هجمات ARP Poisoning، و SYN Flood، وسرقة بيانات المرور غير المشفرة.
   * **الدفاع والاستجابة للحوادث (Blue Team / SOC):** مركز مراقبة وتحليل السجلات وكشف الهجمات وتطبيق قواعد الجدار الناري لحظر المهاجمين.
   * **أساسيات التشفير والمصادقة (Security Fundamentals):** كسر التجزئات وفحص رموز JWT والصلاحيات المشفرة.
4. **عزل أمني صارم (Defense-in-Depth):**
   * شبكات داخلية معزولة تماماً (`internal: true`) بدون وصول للإنترنت الخارجي.
   * تقييد الموارد (CPU 0.5, RAM 512MB, PIDs 100) لمنع استنزاف موارد النظام أو هجمات Fork Bomb.
   * إعادة ضبط حقيقية (True Reset) تمسح الطبقات المؤقتة وتعيد تشغيل القالب النظيف فوراً.

---

## 🏗️ المعمارية التقنية (Architecture Diagram)

```
+-------------------------------------------------------------------+
|                        RogueByte Frontend                         |
|         React + Tailwind CSS + Dual Language (AR / EN)            |
+---------------------------------+---------------------------------+
                                  |
+---------------------------------v---------------------------------+
|                   Core Management API Gateway                     |
|           Express + JWT Authentication + Strict RBAC              |
+-----------------+-----------------+---------------+---------------+
                  |                 |               |
+-----------------v-+      +--------v------+  +-----v---------------+
| PostgreSQL Engine |      | Redis Engine  |  | Tamper-Proof Audit  |
| Courses, Users,   |      | Sessions &    |  | Activity & Security |
| Scores, Flags     |      | Rate Limits   |  | Event Logs          |
+-------------------+      +---------------+  +---------------------+
                                    |
+-----------------------------------v-------------------------------+
|                      Lab Orchestrator Daemon                      |
|       Container Isolation Controller & Ephemeral State Engine     |
+-----------------------------------+-------------------------------+
                                    |
       +----------------------------+---------------------------+
       | [Vulnerable Web Target]    | [Isolated Linux Terminal] |
       | Isolated Bridge Network    | Memory Limits (512MB)     |
       | No External Internet       | Non-Root Execution        |
       +----------------------------+---------------------------+
```

---

## 🚀 دليل البدء السريع والتشغيل المحلي (Quick Start)

للاطلاع على الشرح المفصل والتثبيت خطوة بخطوة على **Windows 10/11 مع WSL2 و Ubuntu و Docker**، يرجى قراءة الملف:  
📖 **[docs/INSTALLATION_AR.md](docs/INSTALLATION_AR.md)**

### الأوامر الأساسية:
```bash
# 1. استنساخ المستودع
git clone https://github.com/RogueByteOfficial/roguebyte-cyber-lab.git
cd roguebyte-cyber-lab

# 2. نسخ ملف الإعدادات
cp .env.example .env

# 3. تثبيت الاعتماديات
npm install

# 4. تشغيل خادم التطوير والواجهة
npm run dev

# 5. تشغيل الاختبارات الآلية للتحقق من العزل والصلاحيات
npm test
```

افتح المتصفح على: `http://localhost:3000`

---

## 🧪 نتائج الاختبارات الآلية (Automated Verification)

يتضمن المشروع حزمة اختبارات شاملة تشمل:
* التحقق من الصلاحيات ومنع الطلاب من الوصول لسجلات الإدارة (`auth-rbac.test.ts`).
* منع الثغرات الأفقية (IDOR) وضمان عدم قدرة أي طالب على إيقاف أو تعديل مختبر طالب آخر (`ownership.test.ts`).
* التحقق من دورة حياة المختبر والتأكد من أن عملية Reset تمسح التغييرات دون حذف نقاط الطالب (`lab-lifecycle.test.ts`).
* التحقق من نظام الأعلام وحساب النقاط ومنع إعادة إرسال الأعلام المكررة (`challenges-scoring.test.ts`).

لتشغيل الاختبارات:
```bash
npm test
```

---

## 📚 وثائق المشروع (Documentation Index)

| الوثيقة | الوصف |
| :--- | :--- |
| **[docs/INSTALLATION_AR.md](docs/INSTALLATION_AR.md)** | دليل التثبيت الشامل على Windows و WSL2 و Docker باللغة العربية. |
| **[docs/GITHUB_PUBLISH_AR.md](docs/GITHUB_PUBLISH_AR.md)** | دليل نشر ومزامنة المستودع على GitHub بأمان وبدون تسريب أسرار. |
| **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** | التفاصيل المعمارية لنظام إدارة الجلسات وشبكات العزل. |
| **[docs/THREAT_MODEL.md](docs/THREAT_MODEL.md)** | نموذج التهديدات وإجراءات الحماية وفق تصنيف STRIDE. |
| **[docs/TROUBLESHOOTING_AR.md](docs/TROUBLESHOOTING_AR.md)** | حل أشهر المشاكل والأخطاء الشائعة أثناء التشغيل. |
| **[docs/TESTING.md](docs/TESTING.md)** | استراتيجية الاختبارات الآلية ومصفوفة التحقق. |
| **[SECURITY.md](SECURITY.md)** | سياسة الإبلاغ الأمني المسؤول. |
| **[AUTHORS.md](AUTHORS.md)** | معلومات المطور والمساهمين الرسميين. |
| **[LICENSE](LICENSE)** | رخصة MIT للمشروع. |

---

## ⚖️ إخلاء مسؤولية قانوني (Legal Disclaimer)

مشروع **RogueByte Cyber Lab** مصمم ومخصص للأغراض التعليمية والتدريبية الدفاعية والأكاديمية فقط. لا يجوز استخدام أي من الأدوات أو المعارف المطروحة في أي أنشطة غير قانونية أو استهداف أنظمة وشبكات دون إذن مسبق وصريح ومكتوب من مالكيها. المطور والمشروع غير مسؤولين عن أي استخدام خاطئ لهذه المنصة.

---

**RogueByte Cyber Lab** © 2026 — تم التصميم والتطوير بواسطة:  
**SID AHMED FARES (SidoDev-Dz)** | **RogueByte**
