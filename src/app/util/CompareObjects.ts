type AnyObject = {
  [key: string]: any;
};
function hasUnfilledValues(obj: AnyObject): boolean {
  for (const key in obj) {
    const value = obj[key];

    if (Array.isArray(value)) {
      // Verificar cada elemento de la lista
      if (value.some((item: any) => hasUnfilledValues(item))) {
        return true;
      }
    } else if (typeof value === 'object' && value !== null) {
      // Verificar cada propiedad del objeto anidado
      if (hasUnfilledValues(value)) {
        return true;
      }
    } else if (value === null || value === '' || value === undefined) {
      // Si el valor es nulo, vacío o indefinido, retornar true
      return true;
    }
  }

  // No se encontraron valores sin diligenciar
  return false;
}

export { hasUnfilledValues }