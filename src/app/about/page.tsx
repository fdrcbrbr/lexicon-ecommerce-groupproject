import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8 px-8">
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-bold text-center">About us</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <Image
          src="https://picsum.photos/id/535/2962/3949"
          alt="Picture representing us"
          width={300}
          height={300}
          className="rounded-lg"
        />
      </div>
      <div className="flex gap-4">
        <Image
          src="https://picsum.photos/id/579/2164/1440"
          alt="Picture of HQ with area"
          width={300}
          height={300}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-bold text-center">History</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
  );
}