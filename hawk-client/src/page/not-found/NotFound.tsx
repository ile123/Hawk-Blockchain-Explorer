import { Card } from "antd";

export default function NotFound() {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Card className="text-center font-medium w-96">
          <h3>Page Not Found</h3>
        </Card>
      </div>
    </>
  );
}
