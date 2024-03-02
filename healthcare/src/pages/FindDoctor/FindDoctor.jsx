import React from "react";
import "./FindDoctor.css";
import Select from 'react-select';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
function FindDoctor(){
    let doctorspecialization =['Neurologist','general Physician','baby care'];
    doctorspecialization = doctorspecialization.map(specialization => ({ value: specialization, label: specialization }));
    const DoctorsList = () => {
        const doctors = [];
        for (let i = 0; i < 10; i++) {
          doctors.push(
            <div className="doctors-list-item" key={i}>
              <div className="doctors-list-item-logo">
                <img src="assets/doctor.png" alt="" />
              </div>
              <div className="doctors-list-item-details">
                <div className="doctor-name">Scott Wann {i+1}</div>
                <Stack spacing={1}>
                  <Rating name="size-large" defaultValue={2} size="large" readOnly />
                </Stack>
              </div>
            </div>
          );
        }
        return doctors;
      }
      
    return(
        <>
        <div className="dashboard-outer-container">
            <div className="dashboard-header">
                <div className="dashboard-header-text">
                Find doctors
                </div>
            </div>
            <div className="dashboard-menu-list">
            <Select
                    options={doctorspecialization}
                    placeholder={'Select specialization'}
                    clearable={true}
                    isMulti
                />

                <div className="doctors-list-displayer">
                    {DoctorsList()}
                </div>
                <div className="doctor-detail-section">
                    <div className="doctor-name-logo">
                        <div className="doctor-logo">
                            <img src="assets/doctor.png" alt="" />
                        </div>
                        <div className="show-doctor-book-appointment">
                        <div className="doctor-name-specialization">
                            <div className="doctor-name">Scott Wann</div>
                            <div className="doctor-specialization">Neurologist</div>
                        </div>
                        </div>
                    </div>
                    <div className="doctor-description-details">
                            <div className="doctor-description-title">Description</div>
                            <div className="doctor-description-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ipsam vero, aperiam ipsum repellat tempora, veritatis, aspernatur voluptate harum quo autem velit odio aliquid enim qui eveniet eum voluptas fuga?</div>
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default FindDoctor;