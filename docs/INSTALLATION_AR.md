# دليل التثبيت والتشغيل المحلي الشامل — RogueByte Cyber Lab
## نظام التشغيل: Windows 10/11 مع WSL2 و Docker و Node.js

* **اسم المشروع:** RogueByte Cyber Lab
* **المطور / المؤلف:** SID AHMED FARES
* **الاسم المستعار للمطور:** SidoDev-Dz
* **العلامة والمؤسسة:** RogueByte
* **حساب GitHub:** [sidopac1a](https://github.com/sidopac1a)
* **المستودع الرسمي:** [RogueByteOfficial/roguebyte-cyber-lab](https://github.com/RogueByteOfficial/roguebyte-cyber-lab)
* **الترخيص:** MIT License

---

## مقدمة
هذا الدليل الفني يقدم تعليمات خطوة بخطوة وباللغة العربية لتجهيز بيئة تطوير كاملة وتشغيل منصة **RogueByte Cyber Lab** على حاسوب يعمل بنظام **Windows 10/11** باستخدام بيئة **WSL2 (Ubuntu)** و **Docker Desktop** و **Node.js LTS**.

> **تنبيه أمني واحترازي:**
> جميع أوامر النظام مصنفة بدقة:
> * الأوامر المخصصة لـ **PowerShell في Windows** معلمة بوضوح.
> * الأوامر المخصصة لـ **Terminal داخل Ubuntu / WSL2** معلمة بوضوح.
> تأكد من كتابة كل أمر في النافذة المخصصة له.

---

### الخطوة 1: التحقق من متطلبات نظام Windows

1. تأكد من أن إصدار Windows لديك يدعم المحاكاة الافتراضية و WSL2:
   * Windows 10 (Build 19041 أو أعلى) أو Windows 11.
2. افتح **PowerShell كمسؤول (Run as Administrator)** وتحقق من حالة المحاكاة الافتراضية (Virtualization):

```powershell
# [PowerShell - Run as Administrator]
systeminfo | findstr /I "Virtualization Hyper-V"
```

يجب أن تكون `Virtualization Enabled In Firmware: Yes`. إذا كانت `No`، قم بتفعيل Virtualization Technology (VT-x / AMD-V) من إعدادات الـ BIOS / UEFI في جهازك.

---

### الخطوة 2: تثبيت WSL2 وتوزيعة Ubuntu

1. في نفس نافذة **PowerShell كمسؤول**، نفّذ:

```powershell
# [PowerShell - Run as Administrator]
wsl --status
```

2. إذا لم يكن WSL مثبتاً أو كان على الإصدار 1:

```powershell
# [PowerShell - Run as Administrator]
wsl --install -d Ubuntu
```

3. بعد اكتمال التثبيت، أعد تشغيل الجهاز إن طُلب منك ذلك.
4. تأكد من ضبط الإصدار الافتراضي على WSL2:

```powershell
# [PowerShell]
wsl --set-default-version 2
wsl --list --verbose
```

يجب أن تظهر توزيعة `Ubuntu` والحالة `Running` والإصدار `2`.

---

### الخطوة 3: تثبيت Git في Windows وفي Ubuntu

1. في نظام Windows (اختياري للتعامل مع المستودعات عبر واجهة المتصفح):
   * حمّل Git من الموقع الرسمي `https://git-scm.com/` أو عبر winget:
   ```powershell
   # [PowerShell]
   winget install --id Git.Git -e --source winget
   ```

2. داخل بيئة **Ubuntu (WSL2)** (الأساسية للتطوير):
   افتح نافذة Ubuntu من قائمة ابدأ أو بكتابة `wsl` في Terminal، ثم نفّذ:
   ```bash
   # [Ubuntu / WSL2]
   sudo apt-get update && sudo apt-get install -y git curl wget build-essential
   git --version
   ```

---

### الخطوة 4: تثبيت Docker Desktop وتفعيل تكامل WSL2

1. حمّل **Docker Desktop for Windows** من الموقع الرسمي:
   `https://www.docker.com/products/docker-desktop/`
2. أثناء التثبيت، تأكد من تحديد خيار:
   `[✓] Use WSL 2 instead of Hyper-V (recommended)`
3. بعد اكتمال التثبيت وتشغيل Docker Desktop:
   * افتح نافذة الإعدادات (أيقونة الترس ⚙️ في الزاوية العلوية).
   * انتقل إلى **General** وتأكد من تفعيل:
     `Use the WSL 2 based engine`
   * انتقل إلى **Resources > WSL Integration**:
     * فعّل خيار `Enable integration with my default WSL distro`.
     * فعّل المفتاح الخاص بتوزيعتك `Ubuntu`.
   * اضغط **Apply & Restart**.

4. التحقق من عمل Docker داخل WSL2:
   افتح نافذة Ubuntu ونفّذ:
   ```bash
   # [Ubuntu / WSL2]
   docker --version
   docker compose version
   docker run --rm hello-world
   ```
   يجب أن ترى رسالة: `Hello from Docker!`.

---

### الخطوة 5: تثبيت Node.js بإصدار LTS متوافق داخل WSL2

يفضل استخدام `nvm` (Node Version Manager) لضمان إدارة الإصدارات بدون مشاكل صلاحيات:

```bash
# [Ubuntu / WSL2]
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# تحميل متغيرات البيئة للطرفية الحالية
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# تثبيت إصدار Node.js LTS (v20 أو v22)
nvm install --lts
nvm use --lts

# التحقق من الإصدار
node --version
npm --version
```

---

### الخطوة 6: تنزيل مشروع RogueByte Cyber Lab

من داخل مجلد المستخدم في Ubuntu (تجنب العمل على مسارات `/mnt/c/` لضمان أداء عالي وسرعة في استجابة الحاويات وملفات Node.js):

```bash
# [Ubuntu / WSL2]
cd ~
mkdir -p workspace
cd workspace

# استنساخ المستودع
git clone https://github.com/RogueByteOfficial/roguebyte-cyber-lab.git
cd roguebyte-cyber-lab
```

---

### الخطوة 7: إعداد ملف المتغيرات البيئية (.env) وكلمات المرور

1. انسخ ملف النموذج `.env.example`:
```bash
# [Ubuntu / WSL2]
cp .env.example .env
```

2. افتح الملف للتعديل بواسطة `nano` أو `vim`:
```bash
# [Ubuntu / WSL2]
nano .env
```

3. قم بتعيين قيم محلية قوية للأسرار:
   * `JWT_SECRET`: أنشئ سلسلة عشوائية لا تقل عن 32 حرفاً:
     ```bash
     openssl rand -hex 32
     ```
   * `DB_PASSWORD`: عيّن كلمة مرور قوية لقاعدة بيانات PostgreSQL.
   * `ADMIN_INITIAL_PASSWORD`: عيّن كلمة مرور معقدة لحساب المسؤول الأول.

---

### الخطوة 8: تثبيت حزم واعتماديات المشروع

```bash
# [Ubuntu / WSL2]
npm install
```

---

### الخطوة 9: تشغيل الخدمات الأساسية (PostgreSQL و Redis) عبر Docker Compose

يحتوي المشروع على ملف `docker-compose.yml` جاهز لإدارة البنية التحتية مع العزل الشبكي:

```bash
# [Ubuntu / WSL2]
docker compose up -d postgres redis

# التحقق من حالة الخدمات
docker compose ps
```

---

### الخطوة 10: تنفيذ مخططات قاعدة البيانات (Database Migrations) وإنشاء المشرف

يقوم المشروع بتطبيق ملفات الهجرة التلقائية من مجلد `db/migrations/`:

```bash
# [Ubuntu / WSL2]
# تنفيذ سكربت تهيئة قاعدة البيانات وإنشاء الجداول وحساب المشرف
npm run db:migrate
npm run db:seed
```

---

### الخطوة 11: تشغيل بيئة العمل واختبار المنصة

1. تشغيل خادم التطوير:
```bash
# [Ubuntu / WSL2]
npm run dev
```

2. افتح المتصفح على جهاز Windows وتوجه إلى:
   `http://localhost:3000`

---

### الخطوة 12: تنفيذ الاختبارات الآلية (Automated Tests)

للتحقق من سلامة نظام الصلاحيات، وعزل المختبرات، وعملية إعادة الضبط (Reset)، ومنع اختراق جلسات الطلاب:

```bash
# [Ubuntu / WSL2]
npm test
```

---

### الخطوة 13: إيقاف الخدمات وإعادة تشغيلها بأمان

* لإيقاف خادم التطوير: اضغط `Ctrl + C` في الطرفية.
* لإيقاف خدمات Docker مع الحفاظ على البيانات:
  ```bash
  docker compose stop
  ```
* لتشغيل الخدمات مجدداً:
  ```bash
  docker compose start
  ```
* لإزالة الحاويات مع تنظيف الشبكات المعزولة:
  ```bash
  docker compose down
  ```

---

### الخطوة 14: تشخيص وحل أشهر المشاكل (Troubleshooting)

1. **خطأ: `docker: command not found` داخل WSL2:**
   * الحل: تأكد من تشغيل Docker Desktop في Windows، ثم ادخل إعدادات Docker Desktop > Resources > WSL Integration، وتأكد من تفعيل توزيعة Ubuntu، واضغط Apply & Restart.

2. **خطأ: المنفذ 3000 أو 5432 محجوز بالفعل:**
   * الحل في PowerShell:
     ```powershell
     netstat -ano | findstr :3000
     ```
   * ثم إنهاء العملية المسببة أو تعديل المنفذ في ملف `.env`.

3. **مشكلة بطء الأداء في WSL2:**
   * تأكد من أن مجلد المشروع موجود داخل مسار Linux الافتراضي (مثل `~/workspace/roguebyte-cyber-lab`) وليس داخل مسار Windows المعلق (`/mnt/c/...`).

---
**RogueByte Cyber Lab** — تم البناء والتطوير بواسطة المهندس: **SID AHMED FARES (SidoDev-Dz)**
