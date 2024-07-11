import { useSearchParams } from 'react-router-dom';

function useQueryParams() {
  const [searchParams] = useSearchParams();

  const getNumericQueryParams = (...params) => {
    const paramAmount = params?.length ?? 0;
    const paramArray = [];

    for (let i = 0; i < paramAmount; i++) {
      let value = +searchParams.get(params[i].name);

      value = isNaN(value) ? 1 : value;
      value = value < params[i].lowLimit ? params[i].lowLimit : value;
      value = value > params[i].upperLimit ? params[i].upperLimit : value;

      paramArray.push(value);
    }

    return paramArray;
  };

  return {
    getNumericQueryParams,
  };
}

export default useQueryParams;