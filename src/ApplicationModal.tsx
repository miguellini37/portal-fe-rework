export const ApplicationModal = () => {
    return (
      <div className="ApplicationModal">
                <div className="modal-content">
          <span className="modal-close" onClick={() => {}}>×</span>
          <h3 id="modal-title" className="text-2xl font-bold mb-4"></h3>
          <p id="modal-position" className="text-gray-400 mb-2"></p>
          <p id="modal-major" className="mb-2"><span className="font-semibold">Preferred Major:</span> </p>
          <p id="modal-location" className="mb-2"><span className="font-semibold">Location:</span> </p>
          <p id="modal-compensation" className="mb-2"><span className="font-semibold">Compensation:</span> </p>
          <p id="modal-benefit" className="mb-2"><span className="font-semibold">Career Benefit:</span> </p>
          <p id="modal-description" className="mb-2"><span className="font-semibold">Description:</span> </p>
          <p id="modal-requirements" className="mb-4"><span className="font-semibold">Requirements:</span> </p>
          <div className="flex space-x-4">
            <button id="modal-request-info" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => {}}>Request Information</button>
            <button id="modal-apply-now" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => {}}>Apply Now</button>
          </div>
        </div>
      </div>
    );
  }
    