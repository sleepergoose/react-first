import { useSearchParams } from 'react-router-dom';

function useQueryParams() {
  const [searchParams] = useSearchParams();

  const getNumericQueryParams = (...params) => {
    const paramAmount = params?.length ?? 0;
    const paramArray = [];

    for (let i = 0; i < paramAmount; i++) {
      let value = Number(searchParams.get(params[i].name));

      value = isNaN(value) ? 1 : value;
      value = value < params[i].lowLimit ? params[i].lowLimit : value;
      value = value > params[i].upperLimit ? params[i].upperLimit : value;

      paramArray.push(value);
    }

    return paramArray;
  };

  const getQueryParams = (...params) => {
    const paramArray = [];

    params.forEach((param) => {
      const rawParam = searchParams.get(param.name);

      switch (param.type) {
        case 'numeric': {
          let value = Number(rawParam);
          value = isNaN(value) ? 1 : value;
          value = value < param.lowLimit ? param.lowLimit : value;
          value = value > param.upperLimit ? param.upperLimit : value;

          paramArray.push(value);
          break;
        }
        case 'enum': {
          if (param.values.some((p) => p === rawParam)) {
            paramArray.push(rawParam);
          } else {
            paramArray.push(param.values[0]);
          }
          break;
        }
        default:
          break;
      }
    });

    return paramArray;
  };

  return {
    getNumericQueryParams,
    getQueryParams,
  };
}

export default useQueryParams;
