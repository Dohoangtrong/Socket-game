import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function knightName() {
    const filePath = join(__dirname, '../pirate_names.txt'); 
    const names = readFileSync(filePath, 'utf-8').split('\n');
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex].trim();
}

export default { 
    knightName
};