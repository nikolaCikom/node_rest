import Company from '../models/company.model.js';
import User from '../models/user.model.js';
import multer from 'multer';
import upload from '../config/multerConfig.js';

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();

    console.log(companies);

    return res.status(200).json({ data: companies });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error');
  }
};

const getCompanyById = async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.render('company', { company: company });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error');
  }
};

const createCompany = async (req, res) => {
  upload.single('image')(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Greška prilikom uploada slike' });
    } else if (err) {
      return res.status(500).json({ error: 'Nepoznata greška' });
    }

    const { name, description } = req.body;

    const image = await req.file.filename;

    try {
      const newCompany = await Company.create({
        name,
        description,
        image,
      });

      res.status(200).json(newCompany);
    } catch (error) {
      return res.status(500).json({ error: 'Greška prilikom dodavanja kompanije.' });
    }
  });
};

const getCompanyByUpdate = async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.render('updateCompany', { company: company });
  } catch (error) {}
};

const updateCompany = async (req, res) => {
  upload.single('image')(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Greška prilikom uploada slike' });
    } else if (err) {
      return res.status(500).json({ error: 'Nepoznata greška' });
    }

    const { name, description } = req.body;
    const companyId = req.params.id;

    try {
      const existingCompany = await Company.findByPk(companyId);

      if (!existingCompany) {
        return res.status(404).json({ error: 'Kompanija nije pronađena' });
      }

      existingCompany.name = name;
      existingCompany.description = description;

      if (req.file) {
        existingCompany.image = req.file.filename;
      }

      await existingCompany.save();

      res.status(200).json(existingCompany);
    } catch (error) {
      return res.status(500).json({ error: 'Greška prilikom ažuriranja kompanije.' });
    }
  });
};

const deleteCompany = async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ error: 'Kompanija nije pronađena.' });
    }

    const users = await User.findAll({ where: { companyId: companyId } });

    for (const user of users) {
      user.companyId = null;
      await user.save();
    }

    await company.destroy();

    return res.status(200).json('Kompanija je uspešno obrisana');
  } catch (error) {
    res.status(500).json({ error: 'Greška prilikom brisanja kompanije' });
  }
};

export default { getAllCompanies, getCompanyById, createCompany, deleteCompany, updateCompany, getCompanyByUpdate };
