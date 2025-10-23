export function handleCoverChange(e, setCover) {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    const width = img.width;
    const height = img.height;

    if (width <= height) { 
      alert("A imagem deve ser retangular horizontal (mais larga que alta)!");
      e.target.value = null;
      setCover(null);
      return;
    }

    setCover(file);
  };
}

export function handleProfileChange(e, setCover) {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    const width = img.width;
    const height = img.height;

    const ratio = width / height;
    const tolerance = 0.1; // ±10% de tolerância

    if (ratio < 1 - tolerance || ratio > 1 + tolerance) {
      alert("A imagem deve ser quadrada ou aproximada (proporção 1:1)!");
      e.target.value = null;
      setCover(null);
      return;
    }

    setCover(file);
  };
}
