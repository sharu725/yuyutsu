---
layout: post
title: "Job Titles Distribution by Gender and Salary"
description: "What are the top 10 Job Titles and how are they distributed?"
categories:
  - notebook
published: true
image: https://static.vecteezy.com/system/resources/previews/011/165/891/non_2x/concept-of-career-and-job-promotion-free-vector.jpg
---

```py
import pandas as pd
import matplotlib.pyplot as plt
data = pd.read_csv("dataset.csv")

top_job_titles = data['Designation'].value_counts().head(10).index

job_counts_male = []
job_counts_female = []
salary_male = []
salary_female = []
college_tier_male = []
college_tier_female = []
degree_male = []
degree_female = []

for title in top_job_titles:
    # Count of males and females
    male_count = data[(data['Designation'] == title) & (data['Gender'] == 'm')].shape[0]
    female_count = data[(data['Designation'] == title) & (data['Gender'] == 'f')].shape[0]
    job_counts_male.append(male_count)
    job_counts_female.append(female_count)
    
    # Average salary for males and females
    male_avg_salary = data[(data['Designation'] == title) & (data['Gender'] == 'm')]['Salary'].mean()
    female_avg_salary = data[(data['Designation'] == title) & (data['Gender'] == 'f')]['Salary'].mean()
    salary_male.append(male_avg_salary)
    salary_female.append(female_avg_salary)
    
    # College tier comparison
    male_college_tier = data[(data['Designation'] == title) & (data['Gender'] == 'm')]['CollegeTier'].value_counts().index[0]
    female_college_tier = data[(data['Designation'] == title) & (data['Gender'] == 'f')]['CollegeTier'].value_counts().index[0]
    college_tier_male.append(male_college_tier)
    college_tier_female.append(female_college_tier)
    
    # Degree comparison
    male_degree = data[(data['Designation'] == title) & (data['Gender'] == 'm')]['Degree'].value_counts().index[0]
    female_degree = data[(data['Designation'] == title) & (data['Gender'] == 'f')]['Degree'].value_counts().index[0]
    degree_male.append(male_degree)
    degree_female.append(female_degree)

# Plotting
x = range(len(top_job_titles))
width = 0.2

fig, ax = plt.subplots(figsize=(12, 8))

# Plotting count distribution
bar_male = ax.bar([i - 0.5*width for i in x], job_counts_male, width, label='Male')
bar_female = ax.bar([i + 0.5*width for i in x], job_counts_female, width, label='Female')

# Plotting salary comparison
ax2 = ax.twinx()
line_male = ax2.plot([i - 0.5*width for i in x], salary_male, color='blue', marker='o', label='Male Salary')
line_female = ax2.plot([i + 0.5*width for i in x], salary_female, color='orange', marker='o', label='Female Salary')

# Set labels, titles, and legends
ax.set_xlabel('Job Titles')
ax.set_ylabel('Count')
ax2.set_ylabel('Average Salary')
ax.set_title('Top 10 Job Titles Distribution by Gender and Salary Comparison')
ax.set_xticks(x)
ax.set_xticklabels(top_job_titles, rotation=45, ha='right')
ax.legend(loc='upper left')
ax2.legend(loc='upper right')

plt.tight_layout()
plt.show()
```

![JobTitle.png](/JobTitle.png)