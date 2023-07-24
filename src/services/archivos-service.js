export async function sendArchivo(file) {

  //1. Crear el archivo vacio y obtener el ID
  const createData = new FormData();
  createData.append('fileName', file.name);
  createData.append('type', file.type);

  let id = "";

  // Realiza la solicitud al backend
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/createChunk', {
      method: "POST",
      body: createData,
    });

    if (!response.ok) {
      throw new Error("Error al enviar noticia");
    }
    const createResponse = await response.json();
    id = createResponse.id;

  } catch (error) {
    throw new Error("Error al enviar noticia: " + error);
  }

  sendAllChunks(id, file);
  return id;
}


const sendAllChunks = async (id, file) => {

  const chunkSize = 2 * 1024 * 1024; // Tamaño del fragmento en bytes
  let start = 0;
  let end = chunkSize;
  let currentChunk = 1;

  const totalChunks = Math.ceil(file.size / chunkSize);

  while (start < file.size) {
    const chunk = file.slice(start, end); // Lee el fragmento del archivo

    // Crea una solicitud para enviar el fragmento al backend
    const formData = new FormData();
    formData.append('id', id);
    formData.append('totalChunks', totalChunks);
    formData.append('actual', currentChunk);
    formData.append('totalSize', file.size);
    formData.append('start', start);
    formData.append('end', end);
    formData.append('chunk', chunk);

    // Realiza la solicitud al backend
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/chunks', {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Error al enviar el archivo.");
      }
    } catch (error) {
      console.log(error)
    }

    // Actualiza los punteros para el siguiente fragmento
    start = end;
    end = Math.min(end + chunkSize, file.size);
    currentChunk++;
  }
}