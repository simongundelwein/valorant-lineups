import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function FileInputForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf("image") !== -1) {
        const blob = item.getAsFile();
        if (blob) {
          setFile(blob);
          break;
        }
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      // Do something with the file here, e.g. upload it to a server
      console.log(file);
    }
  };

  const handlePasteClick = () => {
    navigator.clipboard.read().then((data) => {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.types.includes("image/png") || item.types.includes("image/jpeg")) {
          item.getType("image/png").then((blob) => {
            const file = new File([blob], "pasted-image.png", { type: "image/png" });
            setFile(file);
          });
          break;
        }
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Upload File</Form.Label>
        <div className="input-group">
          <Form.Control type="file" onChange={handleFileChange} onPaste={handlePaste} />
          <Button type="button" variant="primary" onClick={handlePasteClick}>Paste</Button>
        </div>
      </Form.Group>
      <Button type="submit" disabled={!file}>
        Submit
      </Button>
    </Form>
  );
}

export default FileInputForm;