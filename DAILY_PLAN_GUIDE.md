# Daily Production Plan - Tire Recycling Plant Guide

## Overview
The Daily Production Plan has been redesigned specifically for tire recycling operations with three main activity groups:
- **Hooking** (Tire preparation)
- **Cutting** (Tire sectioning)  
- **Shredder/Rubber Crushing** (Final processing)

## Form Structure

### Header Fields
- **Production Center**: Tire recycling plant and production location
- **Activity Day**: Date of production activity
- **Activity Output**: Expected output description

### Table Columns (12 Total)

| # | Column Name | Description | Example Values |
|---|-------------|-------------|----------------|
| 1 | **Activity** | Grouped activity type | Hooking, Cutting, Shredder/Rubber Crushing |
| 2 | **Shift/Time Interval** | Time slot for activity | 2:30-3:30, 3:30-4:30, etc. |
| 3 | **Hourly Goal** | Target quantity per hour | 5, 114.25 |
| 4 | **Unit** | Measurement unit | Pcs, kg |
| 5 | **Input Material Description** | Material being processed | Tyre (default) |
| 6 | **Production Plan Qty** | Total planned quantity | 40, 36, 914 |
| 7 | **Material Measuring Unit** | Unit for plan qty | Pcs, kg |
| 8 | **Actual** | Actual production achieved | (data entry field) |
| 9 | **Team Members** | Team assigned | Rubber powder unit |
| 10 | **Equipment Checks/Status** | Equipment condition | ok, not ok |
| 11 | **Issues** | Problems encountered | Yes, No |
| 12 | **Notes** | Additional remarks | Blade not effective, needs extra blade |

## Sample Data Structure

### Hooking Activity (Rows 1-8)
- **Time Slots**: 2:30-3:30, 3:30-4:30, 4:45-5:45, 5:45-6:10, 7:30-8:30, 8:30-9:30, 9:45-10:45, 10:45-11:00
- **Unit**: Pcs (Pieces)
- **Hourly Goal**: 5 Pcs
- **Production Plan Qty**: 40 Pcs total
- **Input Material**: Tyre
- **Team**: Rubber powder unit
- **Equipment Status**: ok
- **Issues**: No

### Cutting Activity (Rows 9-16)
- **Time Slots**: 2:30-3:30, 3:30-4:30, 4:45-5:45, 5:45-6:10, 7:30-8:30, 8:30-9:30, 9:45-10:45, 10:45-11:00
- **Unit**: Pcs
- **Hourly Goal**: 5 Pcs (early shifts), 4 Pcs (later shifts)
- **Production Plan Qty**: 36 Pcs total
- **Input Material**: Tyre
- **Team**: Rubber powder unit
- **Equipment Status**: ok
- **Issues**: Yes (Blade not effective, needs extra blade)

### Shredder/Rubber Crushing Activity (Rows 17-26)
- **Time Slots**: 2:30-3:30, 3:30-4:30, 4:45-5:45, 5:45-6:10, 7:30-8:30, 8:30-9:30, 9:45-10:45, 10:45-11:00, plus summary rows
- **Unit**: kg (Kilograms)
- **Hourly Goal**: 114.25 kg
- **Production Plan Qty**: 914 kg total
- **Input Material**: Tyre
- **Team**: Rubber powder unit
- **Equipment Status**: ok
- **Issues**: No

## How to Use

1. **Login** to the system with your credentials
2. Select **"Daily Production Plan - Tire Recycling Plant"**
3. Fill in the **Header Fields** (Production Center, Date, Activity Output)
4. For each row:
   - Enter the **Activity** (Hooking/Cutting/Shredder)
   - Set **Shift/Time Interval** (e.g., "2:30-3:30")
   - Enter **Hourly Goal** and **Unit** (Pcs or kg)
   - Default **Input Material** is "Tyre"
   - Enter **Production Plan Qty** for that activity group
   - Set **Material Measuring Unit**
   - During production, fill **Actual** achieved
   - Enter **Team Members** assigned
   - Mark **Equipment Status** (ok/not ok)
   - Note if there are **Issues** (Yes/No)
   - Add any **Notes** for problems or observations
5. **Save** the form when complete
6. Submit for **Reviewer** approval

## Tips for Data Entry

- **Group similar activities**: Keep all Hooking rows together, then Cutting, then Shredder
- **Use consistent time formats**: HH:MM-HH:MM (e.g., 2:30-3:30)
- **Default to "Tyre"** for input material unless processing something else
- **Track issues promptly**: Note equipment problems or blade issues immediately
- **Sum rows**: Add summary rows like "sum hooking", "sum cutting", "sum Granuel" for totals

---

## Need Help?
Contact your system administrator or refer to the user manual for assistance.
