import React, { useCallback, useEffect, useState, KeyboardEvent } from 'react';
import Modal from 'react-modal';
import { ICompanyPaylod } from '../../../api/company';
import { IUpdateCompanyEmployeePayload } from '../../../api/companyEmployee';
import './company.css';

type Props = {
  company: ICompanyPaylod;
  setCompany: React.Dispatch<React.SetStateAction<ICompanyPaylod>>;
  editMode: boolean;
};

type Employee = IUpdateCompanyEmployeePayload & { email?: string; phone?: string };

const initials = (f?: string, l?: string) => ((f?.[0] ?? '') + (l?.[0] ?? '') || '?').toUpperCase();
const fullName = (f?: string, l?: string) => [f, l].filter(Boolean).join(' ') || 'Unnamed';

export const CompanyEmployeeTab: React.FC<Props> = ({ company }) => {
  const employees = (company.companyEmployees ?? []) as Employee[];
  const [selected, setSelected] = useState<Employee | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { try { Modal.setAppElement('#root'); } catch { /* noop */ } }, []);
  const openEmployee = useCallback((emp: Employee) => { setSelected(emp); setIsOpen(true); }, []);
  const closeModal = useCallback(() => { setIsOpen(false); setSelected(null); }, []);
  const onKeyOpen = useCallback((e: KeyboardEvent<HTMLLIElement>, emp: Employee) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEmployee(emp); }
  }, [openEmployee]);

  return (
    <div className="employees-grid card" contentEditable={false} onKeyDownCapture={(e) => e.stopPropagation()}>
      <section className="card employees-card">
        <h3 className="section-title">Our Team</h3>
        <p className="section-subtitle">The people behind the work.</p>

        {employees.length === 0 ? (
          <p className="employees-empty">No employees listed.</p>
        ) : (
          <ul className="employee-list" aria-label="Employees">
            {employees.map((emp, i) => {
              const key = emp.id ?? `${emp.firstName ?? ''}-${emp.lastName ?? ''}-${emp.position ?? ''}-${i}`;
              return (
                <li
                  key={key}
                  className="employee-item"
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  onClick={() => openEmployee(emp)}
                  onKeyDown={(e) => onKeyOpen(e, emp)}
                >
                  <div className="employee-avatar" aria-hidden="true">{initials(emp.firstName, emp.lastName)}</div>
                  <div className="employee-name">{fullName(emp.firstName, emp.lastName)}</div>
                  <div className="employee-position">{emp.position ?? 'Recruiter'}</div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel={selected ? `${fullName(selected.firstName, selected.lastName)} details` : 'Employee details'}
        overlayClassName="modal-overlay"
        className="modal-content modal-sm"
      >
        {selected && (
          <div className="employee-modal-center">
            <button className="modal-close" onClick={closeModal} aria-label="Close dialog">×</button>
            <div className="employee-avatar employee-avatar-lg" aria-hidden="true">
              {initials(selected.firstName, selected.lastName)}
            </div>
            <h2 className="employee-modal-name">{fullName(selected.firstName, selected.lastName)}</h2>
            <div className="employee-modal-position">{selected.position ?? 'Recruiter'}</div>

            <div className="employee-modal-contact">
              <div className="employee-contact-row">
                <span className="employee-contact-emoji" aria-hidden="true">✉️</span>
                {selected.email ? (
                  <a href={`mailto:${selected.email}`} className="employee-contact-link">{selected.email}</a>
                ) : (
                  <span className="employee-contact-muted">Email not provided</span>
                )}
              </div>
              <div className="employee-contact-row">
                <span className="employee-contact-emoji" aria-hidden="true">📞</span>
                {selected.phone ? (
                  <a href={`tel:${selected.phone}`} className="employee-contact-link">{selected.phone}</a>
                ) : (
                  <span className="employee-contact-muted">Phone not provided</span>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};