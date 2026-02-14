# 🚀 QUICK START GUIDE

## ⚡ Get Running in 5 Minutes

### Step 1️⃣: Open Terminal
Navigate to the project folder:
```bash
cd "c:\Users\satyy\OneDrive\Desktop\satyam\Machine learning\bloggen"
```

### Step 2️⃣: Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3️⃣: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4️⃣: Add Your API Key
1. Open the `.env` file in the project root
2. Replace `OPENAI_API_KEY=` with your actual key:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

Get your key from: https://platform.openai.com/api-keys

### Step 5️⃣: Run It!
```bash
python main.py
```

Then enter a topic when prompted:
```
Enter the blog topic: Artificial Intelligence
```

That's it! 🎉

---

## 📚 What You Got

✅ **15 Files Created**:
- 8 Python source files
- 6 Documentation files  
- 1 Requirements file
- 1 Environment template

✅ **Features**:
- Agent-based blog generation
- Multi-source research (Wikipedia + Web)
- Automatic blog structure
- File persistence
- Error handling

---

## 📖 Documentation Files (In Order)

1. **README.md** - Full overview and features
2. **INSTALLATION.md** - Detailed setup guide
3. **USAGE_GUIDE.md** - How to use the system
4. **ARCHITECTURE.md** - Technical design
5. **CHALLENGES_AND_IMPROVEMENTS.md** - Lessons learned
6. **PROJECT_SUMMARY.md** - Complete summary

---

## 🎯 Your First Blog

```bash
python main.py
```

Enter topic: `Quantum Computing`

Result: Blog saved to `output/blog_quantum_computing_[timestamp].md`

---

## 💡 Try These Topics

- Artificial Intelligence
- Machine Learning
- Climate Change
- Blockchain Technology
- Future of Space Exploration
- Renewable Energy
- Mental Health
- Cybersecurity

---

## 🔧 Customization

Edit `.env` to adjust:
```
TEMPERATURE=0.5         # 0=factual, 1=creative
MAX_TOKENS=2000        # Blog length
MODEL_NAME=gpt-3.5-turbo
```

---

## 🆘 Troubleshooting

**Error: "OPENAI_API_KEY is not set"**
→ Check your `.env` file has the API key

**Error: "Module not found"**
→ Run: `pip install -r requirements.txt`

**Takes too long**
→ The default setup takes 45-90 seconds per blog (normal)

**Need help?**
→ See `INSTALLATION.md` or `USAGE_GUIDE.md`

---

## 📝 Next Steps

1. ✅ Follow steps 1-5 above
2. ✅ Run `python main.py` 
3. ✅ Try a few topics
4. ✅ Check generated blogs in `output/` folder
5. ✅ Read `USAGE_GUIDE.md` for advanced usage
6. ✅ Explore `examples.py` for programmatic usage

---

**You're ready to go!** 🚀

For detailed info, see README.md or USAGE_GUIDE.md
