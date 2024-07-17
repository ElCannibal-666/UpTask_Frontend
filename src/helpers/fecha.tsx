const formatearFecha = (fecha: Date = new Date()): string => {
  try {
    if (!(fecha instanceof Date)) {
      throw new Error("Se espera un objeto de tipo Date.");
    }

    const opciones: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };

    const fechaDeHoy: string = fecha.toLocaleDateString("es-ES", opciones);

    return fechaDeHoy;
  } catch (error) {
    console.log(error);
    // Puedes lanzar el error nuevamente o devolver un valor predeterminado
    return "Fecha inválida";
  }
};

export default formatearFecha;
