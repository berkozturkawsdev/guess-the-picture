import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const levelsDir = path.join(__dirname, "..", "public", "levels");

const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".bmp",
    ".tiff"
];

async function main() {
    if (!fs.existsSync(levelsDir)) {
        console.error(`Directory not found: ${levelsDir}`);
        process.exit(1);
    }

    const levelFolders = fs
        .readdirSync(levelsDir, { withFileTypes: true })
        .filter(entry => entry.isDirectory());

    for (const folder of levelFolders) {
        const folderPath = path.join(levelsDir, folder.name);

        const images = fs
            .readdirSync(folderPath)
            .filter(file =>
                imageExtensions.includes(
                    path.extname(file).toLowerCase()
                )
            )
            .sort((a, b) => a.localeCompare(b));

        console.log(`\nLevel ${folder.name}: ${images.length} images`);

        if (images.length !== 4) {
            console.warn(
                `⚠️ Skipping ${folder.name}: expected 4 images, found ${images.length}`
            );
            continue;
        }

        const allWebp = images.every(
            file => path.extname(file).toLowerCase() === ".webp"
        );

        // ------------------------------------------
        // ALL IMAGES ALREADY WEBP
        // ------------------------------------------
        if (allWebp) {
            console.log("  ✓ All images already WebP");

            const tempFiles = [];

            // Rename to temporary names first
            for (let i = 0; i < images.length; i++) {
                const extension = ".webp";
                const tempName = `.__temp_${i}${extension}`;

                fs.renameSync(
                    path.join(folderPath, images[i]),
                    path.join(folderPath, tempName)
                );

                tempFiles.push(tempName);
            }

            // Rename to 1.webp - 4.webp
            for (let i = 0; i < tempFiles.length; i++) {
                const newName = `${i + 1}.webp`;

                fs.renameSync(
                    path.join(folderPath, tempFiles[i]),
                    path.join(folderPath, newName)
                );

                console.log(`  → ${newName}`);
            }

            continue;
        }

        // ------------------------------------------
        // CONVERT NON-WEBP IMAGES
        // ------------------------------------------

        console.log("  Converting images to WebP...");

        const tempFiles = [];

        for (let i = 0; i < images.length; i++) {
            const inputFile = path.join(folderPath, images[i]);

            const tempFile = path.join(
                folderPath,
                `.__temp_${i}.webp`
            );

            await sharp(inputFile)
                .webp({ quality: 85 })
                .toFile(tempFile);

            tempFiles.push(tempFile);

            console.log(`  Converted: ${images[i]}`);
        }

        // Delete originals
        for (const image of images) {
            fs.unlinkSync(path.join(folderPath, image));
        }

        // Rename converted files
        for (let i = 0; i < tempFiles.length; i++) {
            const newName = `${i + 1}.webp`;
            const newPath = path.join(folderPath, newName);

            fs.renameSync(tempFiles[i], newPath);

            console.log(`  → ${newName}`);
        }
    }

    console.log("\n✅ All levels processed!");
}

main().catch(error => {
    console.error("\n❌ Error:", error);
    process.exit(1);
});