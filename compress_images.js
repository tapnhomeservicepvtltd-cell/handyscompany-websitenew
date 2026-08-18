const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      if (file !== 'extracted_final_thumbnails' && file !== 'extracted_thumbnails') {
        filelist = walkSync(path.join(dir, file), filelist);
      }
    }
    else {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
         filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const files = walkSync('assets');
let optimized = 0;
let totalSaved = 0;

async function processFiles() {
  for (const file of files) {
     const stat = fs.statSync(file);
     // Target files > 200KB
     if (stat.size > 200 * 1024) {
        const tempFile = file + '.tmp' + path.extname(file);
        try {
            await sharp(file)
               .resize({ width: 500, withoutEnlargement: true })
               .png({ quality: 60, compressionLevel: 9 })
               .toFile(tempFile);
            const newStat = fs.statSync(tempFile);
            if (newStat.size < stat.size) {
               fs.renameSync(tempFile, file);
               optimized++;
               totalSaved += (stat.size - newStat.size);
               console.log(`Optimized ${file} - Saved ${(stat.size - newStat.size) / 1024 / 1024} MB`);
            } else {
               fs.unlinkSync(tempFile);
            }
        } catch(e) {
            console.error(`Failed to optimize ${file}`, e.message);
        }
     }
  }
  console.log(`Optimized ${optimized} files. Total saved: ${totalSaved / 1024 / 1024} MB`);
}

processFiles();
