import path from "node:path";
import * as fs from "node:fs";

export async function storeImage (form: FormData){
    const image = form.get('image') as File
    const imageDir = path.join('public', 'images')

    if (image.size > 0){
        
        const newImagePath = `${new Date().toISOString().replace(/:/g, '-')}${path.extname(image.name)}`;

        const fullImagePath = path.join(imageDir, newImagePath);

        if(!fs.existsSync(imageDir)){
            fs.mkdirSync(imageDir, {recursive: true});
        }
        fs.writeFile(
            fullImagePath,
            Buffer.from(await image.arrayBuffer()),
            (err: NodeJS.ErrnoException | null)=> {
                if (err) throw new Error(err.message);
            }
        )

        return `images/${newImagePath}`;
    }
}

export async function updateStoreImage (form: FormData, userImage: string | null){
    const image = form.get('image') as File
    const imageDir = path.join('public', 'images');

    if (image.size > 0) {
        const newImagePath = `${new Date().toISOString().replace(/:/g, '-')}${path.extname(image.name)}`;
        const fullImagePath = path.join(imageDir, newImagePath);

        if (userImage) {
            const oldImagePath = `public/${userImage}`;
            console.log(oldImagePath)

            if (fs.existsSync(oldImagePath)) {
                fs.unlink(oldImagePath, (err: NodeJS.ErrnoException | null) => {
                    if (err) throw new Error(err.message);
                    console.log("Imagem antiga apagada com sucesso.");
                });
            }
        }

        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, {recursive: true});
            console.log("Diretório criado com sucesso");
        }

        fs.writeFile(
            fullImagePath,
            Buffer.from(await image.arrayBuffer()),
            (err: NodeJS.ErrnoException | null) => {
                if (err) throw new Error(err.message);
                console.log("Imagem salva com sucesso.");
            }
        );

       return `images/${newImagePath}`;
    }
}