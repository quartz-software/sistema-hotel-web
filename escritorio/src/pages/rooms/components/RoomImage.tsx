import { FC, useState } from "react"
import Button from "../../common/components/Button"
import FormField from "../../common/components/FormField"
import Input from "../../common/components/Input"

type ImageRoom = {
  model: RoomImage,
  onChange: (file: File) => void
}

const RoomImage: FC<ImageRoom> = ({ model, onChange }) => {
  const [image, setImage] = useState(model)
  const [imgSrc, setImgSrc] = useState(image.path ?? image.url)
  return (
    <div className="div-image">
      <FormField label="Nombre" errorMessage="">
        <Input type="text"
          value={image.name}
          handleInput={(value: string) => { setImage({ ...image, name: value }) }}
          resetMessage={() => { }} />
      </FormField>
      <FormField label="Tipo" errorMessage="">
        <select
          value={image.type}
          onChange={(e) => {
            setImage({ ...image, type: e.target.value })
          }}
        >
          <option value="normal">Normal</option>
          <option value="3d">3D</option>
          <option value="panoramic">Panoramica</option>
        </select>
      </FormField>
      <FormField label="Imagen" errorMessage="">
        <>
          <Input type="file"
            handleInput={(value: File) => {
              onChange(value)
              const filereader = new FileReader()
              filereader.readAsDataURL(value)
              filereader.addEventListener("load", (e) => {
                setImgSrc(e.target?.result)
              })
              setImage({ ...image, file: value })
            }}
            value={""}
            resetMessage={() => { }}
          />
          <img src={imgSrc} alt="" />
        </>
      </FormField>
      <Button handleClick={() => {
        console.log(image);
      }}>
        Eliminar
      </Button>
    </div>
  )
}

export default RoomImage