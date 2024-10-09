# MySynerry_shorturl
ในส่วนของ frontend ผมใช้ดังนี้
   --ใช้ node.js เเละ express.js 
   --ยิง req ด้วย axios 
   -- ใช้ database ด้วย postgres บน vercel(มีบริการ)
ในส่วนการติดตั้ง
  -- clone ไฟล์จาก git มา เเล้วทำการ ติดตั้ง library ที่จำเป็น พิมพ์ npm i มันจะอิงจาก package.json คือสิ่งที่จำเป็น
  --จากนั้น ถ้าต้องการที่จะdeploy ลงบนserver เช่น vercel มันจะได้ domain ที่ไม่เหมือนเดิม ต้องกลับไปเเก้ โค้ด ในส่วน ของ frontend ในไฟล์ชื่อ Shorturl.js เพราะอันนี้จะ ยิง req ไปที่ serverนี้ ถ้า domain เปลี่ยน ก็ต้องกลับไปเเก้ที่ไฟล์นั้นให้มันตรงกัน  ส่วน table ใน postgres มีดังนี้
  CREATE TABLE url_shortener (
    id SERIAL PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_url TEXT NOT NULL,
    clicklink int DEFALUT(0)
);
