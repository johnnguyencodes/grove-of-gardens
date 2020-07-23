import React from 'react';

export default function Modal() {
  return (
    <>
      <div className="modal fade" id="">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
            </div>
            <div className="modal-body">
              <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
