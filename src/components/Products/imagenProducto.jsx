import Imgix from "react-imgix";

function imagenProducto(props) {
  return (
    <>
      <Imgix src={props.imgUrL} height={250} width={200} imgixParams={{fit:'crop'}}/>
    </>
  );
}

export default imagenProducto;
