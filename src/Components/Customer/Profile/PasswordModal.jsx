import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import PasswordForm from './PasswordForm';

export default function PasswordModal({setIsUpdatePassword, hasPassword, BASE_URL, isUpdatePassword}) {

    const toggleShow = () => {
      setIsUpdatePassword(!isUpdatePassword)
    }

  return (
    <><button onClick={toggleShow} className='btn-info btn'>Update Password</button>
      <MDBModal show={isUpdatePassword}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update Password</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <PasswordForm
                setIsUpdatePassword={setIsUpdatePassword}
                hasPassword={hasPassword}
                BASE_URL={BASE_URL}
                />
            </MDBModalBody>
            <MDBModalFooter>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}