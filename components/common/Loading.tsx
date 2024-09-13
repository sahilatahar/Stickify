import { Bars } from 'react-loader-spinner';

function Loading() {
  return <Bars color="#6300B3" width={50} />;
}

function LoadingPage() {
  return (
    <main className="grid min-h-[calc(100vh-70px)] max-w-screen-xl place-items-center">
      <Loading />
    </main>
  );
}

function LoadingFullScreen() {
  return (
    <div className="bg-light fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center">
      <Loading />
    </div>
  );
}

export { Loading, LoadingPage, LoadingFullScreen };
