export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 z-10 h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-30"
      >
        <source src="/video/mesh_bg.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
