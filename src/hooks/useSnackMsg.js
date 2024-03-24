import { useSnackbar } from 'notistack';

export default function useSnackMsg() {
  const { enqueueSnackbar } = useSnackbar();

  const eSnack = msg => enqueueSnackbar(msg, { variant: 'error' });
  const sSnack = msg => enqueueSnackbar(msg, { variant: 'success' });

  return { eSnack, sSnack };
}
