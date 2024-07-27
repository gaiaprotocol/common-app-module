class ImageCompressor {
  public async isAnimatedGif(file: File): Promise<boolean> {
    const response = await fetch(URL.createObjectURL(file));
    const arrayBuffer = await response.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    if (buffer[0] !== 0x47 || buffer[1] !== 0x49 || buffer[2] !== 0x46) {
      throw new Error("Not a GIF file");
    }

    let frames = 0;
    for (let i = 0; i < buffer.length; i++) {
      if (
        buffer[i] === 0x21 && buffer[i + 1] === 0xF9 && buffer[i + 2] === 0x04
      ) {
        frames++;
        if (frames > 1) {
          return true;
        }
      }
    }
    return false;
  }

  public async compress(
    file: File,
    width: number,
    height: number,
  ): Promise<File> {
    if (file.type === "image/gif") {
      const isAnimated = await this.isAnimatedGif(file);
      if (isAnimated) {
        console.log("Animated GIFs are not compressed.");
        return file;
      }
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const scaleFactor = img.width <= width && img.height <= height
            ? 1
            : Math.min(width / img.width, height / img.height);

          canvas.width = img.width * scaleFactor;
          canvas.height = img.height * scaleFactor;

          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            if (blob) {
              if (blob.size < file.size) {
                const fileName = file.name.replace(/(\.[^\.]+)$/, ".jpg");
                const compressedFile = new File([blob], fileName, {
                  type: "image/jpeg",
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            } else {
              reject(new Error("Canvas to Blob conversion failed"));
            }
          }, "image/jpeg");
        };
        img.onerror = (error) => reject(error);
        img.src = event.target?.result as string;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
}

export default new ImageCompressor();
