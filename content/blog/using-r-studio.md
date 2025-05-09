---
date: '2025-04-10T08:00:00.000Z'
title: Using R Studio
tagline: Everything I learned from CDS6224 in one quick guide.
preview: >-
  This article is mostly to explain what I've learn from the course Statistical Data Analysis (CDS6224) regarding R studio. Think of it as a general guide.
image: >-
  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyQYUUDj134qNqcQ2zONrDr54rCS7Is7JrtQ&s
keywords: "R Studio, Statistical Data Analysis, R"
author:
  authorname: Lord Junn
  authorimage: >-
    https://cdn.discordapp.com/avatars/294784896579403777/fffbe8d9591126d66f8a3b57da81e26a.png?size=4096
readingtime: 1
---

# How to use R

This article is mostly to explain what I've learn from the course Statistical Data Analysis (CDS6224) regarding R studio.

## Commands

### R (Data) Commands
Let's assume x, y, z as our variables.
`x <- c(number1, number2, number3 ... numberN)`: stores values into variable, outputs as `num[1:N] number1, number2 ... numberN`.
`func(x)`: using a function to do x, includes commands such as `mean`, `sd` & `median`.
`y <- func(x)`: stores the output of `func(x)` & stores into `y`.
`x <- read.csv(filenamehere.csv)`: Imports dataset of your choice.

### R (Non-Data) Commands
`getwd()`: Shows current working directory
`setwd("your/folder/path")`: Sets working directory
`list.files()`: Lists files in the current directory

### Built in R (Data) Functions
`mean`: Calculates the average of a numeric vector.  
`median`: Returns the middle value in a sorted numeric vector.  
`names(sort(table(x), decreasing = TRUE)[1])`: Finds the mode (most frequently occurring value).  
`sd`: Computes the standard deviation, showing how spread out the values are.  
`var`: Calculates the variance (the square of the standard deviation).  
`range`: Returns the minimum and maximum values in the data.  
`quantile`: Provides percentile values (e.g. 25th, 50th, 75th).  
`IQR`: Computes the interquartile range (Q3 - Q1), used to detect outliers.

### Built in R (Plotting) Functions
Used as either `func(thing)`, `func(thing, col=colour)`, `func(thing, main="name", col="colour", [x/y]="thing2")`

`hist`: Creates a histogram to visualize the distribution of a numeric variable.  
`boxplot`: Draws a boxplot to show median, quartiles, and potential outliers.  
`qqnorm`: Generates a QQ plot to visually assess if data follows a normal distribution.  
`qqline`: Adds a reference line to a QQ plot for easier comparison.  
`plot`: Creates a general-purpose scatter or line plot (often used with `density`, regression, or base plots).

### Non R Commands
`CTRL + L`: Clears the screen

## Other Tips
Remember to add another `/` should you wish to import files from other places.  
Otherwise, it is preferable to put the `.csv` directly into the folder of your workplace to prevent potential errors (for the less technically savvy).




