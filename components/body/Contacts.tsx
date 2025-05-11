
import React from 'react';
import styles from '@/Styles/Contacts.module.css'; 

const Contacts = () => {
  return (
    <section className={styles.contactUs}>
      <div className={styles.contactInfo}>
        <h2>ارتباطات</h2>
        <ul>
          <li>
            <span className={styles.label}>تلفن:</span> +98 31 12345678
          </li>
          <li>
            <span className={styles.label}>فکس:</span> +98 31 87654321
          </li>
          <li>
            <span className={styles.label}>ایمیل:</span> example@example.com
          </li>
          <li>
            <span className={styles.label}>آدرس:</span> اصفهان، خیابان آزادی، پلاک 10
          </li>
        </ul>
      </div>
      <div className={styles.googleMap}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.595306467441!2d51.514312315581524!3d32.65320333440717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fef5f7d4c47b8bf%3A0x7889d477879c9e22!2z2KrZhdin2YbZhdmI2YQg2YbYp9iqINin2YbYr9mI!5e0!3m2!1sen!2sus!4v1642518905598!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default Contacts;
