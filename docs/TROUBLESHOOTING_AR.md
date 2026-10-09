# دليل استكشاف الأخطاء وحلها — RogueByte Cyber Lab

* **المؤلف:** SID AHMED FARES (SidoDev-Dz)
* **المشروع:** RogueByte Cyber Lab
* **المستودع:** sidopac1a / roguebyte-cyber-lab

---

## 1. مشكلات اتصال Docker و WSL2

### المشكلة: `Cannot connect to the Docker daemon at unix:///var/run/docker.sock`
**السبب:** Docker Desktop غير مشغل أو لم يتم تفعيل تكامل WSL2 مع توزيعة Ubuntu.
**الحل:**
1. افتح تطبيق **Docker Desktop** في Windows.
2. انتظر حتى تصبح الأيقونة خضراء (Docker is running).
3. ادخل إلى **Settings > Resources > WSL Integration**.
4. تأكد من تفعيل خيار توزيعة `Ubuntu`.
5. اضغط **Apply & Restart**.
6. داخل Ubuntu نفّذ:
   ```bash
   docker ps
   ```

---

## 2. تعارض المنافذ (Port Conflicts)

### المشكلة: `Error: listen EADDRINUSE: address already in use :::3000` أو `:::5432`
**السبب:** يوجد تطبيق آخر (مثل خادم محلي قديم أو خدمة PostgreSQL مثبتة في Windows) يستمع على نفس المنفذ.
**الحل:**
* لمعرفة العملية في PowerShell:
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
  ```
* لإنهاء العملية أو تغيير المنفذ في ملف `.env`:
  ```bash
  PORT=3005
  ```

---

## 3. مشاكل قاعدة البيانات (PostgreSQL)

### المشكلة: `database "roguebyte_lab" does not exist` أو `connection refused`
**السبب:** لم يتم تشغيل حاوية قاعدة البيانات بعد أو لم يتم إنشاء المخطط الأولي.
**الحل:**
```bash
# تشغيل الحاوية
docker compose up -d postgres

# الانتظار حتى اكتمال الجاهزية ثم تشغيل الهجرة
npm run db:migrate
```

---

## 4. تعليق حالة المختبر أو فشل إعادة الضبط (Lab Session Stuck)

### المشكلة: الجلسة عالقة في حالة `RESETTING` أو `PROVISIONING`
**السبب:** تأخر استجابة فحص الجاهزية (Health Check) أو تجاوز حد الموارد المسموح به.
**الحل:**
1. استخدم زر **Force Stop** أو **Hard Reset** في واجهة الإدارة.
2. عبر الطرفية لتنظيف الحاويات المعلقة:
   ```bash
   docker ps --filter "name=rogue_lab_" -q | xargs -r docker rm -f
   ```
3. تسجيل الحدث في سجلات التدقيق (Audit Logs) وتعديل الحد الأقصى للموارد في `.env`.

---

## 5. مشاكل الصلاحيات في WSL2 وملفات Node.js

### المشكلة: `EACCES: permission denied` عند تشغيل `npm install`
**السبب:** تثبيت الحزم بصلاحيات `sudo` أو وضع المشروع في مسار أقراص Windows المشتركة `/mnt/c/`.
**الحل:**
1. انقل المشروع دائماً إلى مسار مجلد المستخدم في Linux: `~/workspace/roguebyte-cyber-lab`.
2. صحح ملكية الملفات للمستخدم الحالي:
   ```bash
   sudo chown -R $USER:$USER ~/workspace/roguebyte-cyber-lab
   ```

---
تم إعداد الدليل بواسطة المهندس: **SID AHMED FARES (SidoDev-Dz)** © 2026
