import React from 'react';

import { Link } from 'react-router-dom';
import './About.scss';

const DEV_EMAIL = 'phamthanhtri60020341@gmail.com'; // Thay bằng email của bạn

const About = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const company = form.company.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const message = form.message.value;

    const subject = encodeURIComponent('Liên hệ từ trang Lofi Website');
    const body = encodeURIComponent(
      `Tên: ${name}\nCông ty: ${company}\nEmail: ${email}\nSĐT: ${phone}\nThành phố: ${location}\n\nNội dung:\n${message}`
    );
    window.location.href = `mailto:${DEV_EMAIL}?subject=${subject}&body=${body}`;
  };
  return (
    <div className='container'>
      <nav className='container__nav'>
        <Link to='/home'>
          <img src='/assets/icons/lofi-logo.gif' alt='' />
        </Link>
        <div className='nav-menu'>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.linkedin.com/in/phạm-thành-trí-73ba93362/'
          >
            <i className='fab fa-linkedin'></i>
            <span>Linkedin</span>
          </a>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://github.com/ThanhTri14032006'
          >
            <i className='fab fa-github'></i>
            <span>GitHub</span>
          </a>
          <Link to='/about'>
            <i className='fas fa-info'></i>
            <span>Liên hệ</span>
          </Link>
        </div>
      </nav>
      <section className='contact-layout'>
        <div className='contact-left'>
          <div className='contact-group'>
            <h3>PHONE</h3>
            <div className='contact-lines'>
              <div>
              <div>I am a software developer living in  </div>
              <div>Hồ Chí Minh City , Vietnam</div>
              </div>
              <div>
                <div>I am a student from </div>
                <div>Nguyễn Tất Thành University</div>
              </div>
            </div>
          </div>
          <div className='contact-group'>
            <h3>Thành Trí</h3>
            <div className='contact-lines'>(+84) 931 254 118 </div>
          </div>
          <div className='contact-group'>
            <h3>Email</h3>
            <div className='contact-lines'>
              <div>
                <div>GENERAL INQUIRIES</div>
                <a href={`mailto:${DEV_EMAIL}`}>{DEV_EMAIL}</a>
              </div>
              <div>
                <div>GITHUB</div>
                <a target='_blank' rel='noreferrer' href='https://github.com/ThanhTri14032006'>Send Github</a>
              </div>
              <div>
                <div>LINKEDIN</div>
                <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/phạm-thành-trí-73ba93362/'>Send LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
        <div className='contact-right'>
          <div className='contact-right__header'>SEND US SOME ELECTRONIC MAIL</div>
          <form className='contact-form' onSubmit={handleSubmit}>
            <label>
              <span>Your Name:</span>
              <input name='name' type='text' required />
            </label>
            <label>
              <span>Company:</span>
              <input name='company' type='text' />
            </label>
            <label>
              <span>Email Address:</span>
              <input name='email' type='email' required />
            </label>
            <label>
              <span>Phone Number:</span>
              <input name='phone' type='tel' />
            </label>
            <label>
              <span>Location (city):</span>
              <input name='location' type='text' required />
            </label>
            <label className='full'>
              <span>Message:</span>
              <textarea name='message' rows='5' required />
            </label>
            <div className='form-actions'>
              <button type='submit' className='send-button'>SEND</button>
              <Link to='/'><button type='button' className='btn-secondary'>Back to homepage</button></Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default About;
