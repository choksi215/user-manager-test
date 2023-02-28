function resHandler(res: Response) {
  return res.json();
}
    
function errorHandler(res: Response) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res;
}

export const fetcher = (url: RequestInfo | string, options?: RequestInit) =>
  fetch(url, options)
    .then(errorHandler)
    .then(resHandler);
