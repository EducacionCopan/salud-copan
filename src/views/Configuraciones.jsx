import { Button, Container, Modal } from "react-bootstrap";
import { Layout } from "./Layout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Configuracion } from "./Configuracion";
import useFetch from "../hooks/useFetch";

export const Configuraciones = () => {
  //Validacion
  const {valid, userData} = useContext(UserContext);
  const navigation = useNavigate()
  useEffect(() => {
    if(!valid || userData.rol === 'Publish'){
      navigation('/')
    }
  }, [valid, userData, navigation])

  const { data } = useFetch(process.env.REACT_APP_API_URL +  `/config`);
  
  //Modal General
  const [showGeneral, setShowGeneral] = useState(false);
  const handleCloseGeneral = () => setShowGeneral(false);
  const handleShowGeneral = () => setShowGeneral(true);

  return (
    <>
    <Layout pagina={"Configuraciones"}>
      <Container className='d-flex flex-column align-items-center gap-3'>
        <h1 className="titulo-contacto">Configuraciones</h1>
        <Button variant="warning" className="px-3" onClick={handleShowGeneral}>
          <i className="bi bi-tools"></i>{' '}Configuracion General
        </Button>  
        <Button variant="warning" className="px-3">
          <i className="bi bi-tools"></i>{' '}Valores
        </Button> 
        <Button variant="warning" className="px-3">
          <i className="bi bi-tools"></i>{' '}Pie de Pagina
        </Button> 
        <Button variant="warning" className="px-3">
          <i className="bi bi-tools"></i>{' '}Secciones
        </Button> 
        <Button variant="warning" className="px-3">
          <i className="bi bi-tools"></i>{' '}Contacto
        </Button> 
      </Container>
    </Layout>
    <Modal show={showGeneral} onHide={handleCloseGeneral} size="lg">
      <Configuracion data={data} handleClose={handleCloseGeneral}/>
    </Modal>
    </>
  );
}