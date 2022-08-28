data = {
    1: "empty_cell.png",
    2: "start_end_new_0.png",
    3: "start_end_new_90.png",
    4: "start_end_new_180.png",
    5: "start_end_new_270.png",
    6: "quarter_0.png",
    7: "quarter_90.png",
    8: "quarter_180.png",
    9: "quarter_270.png",
    10: "right_angle_0.png",
    11: "right_angle_90.png",
    12: "right_angle_180.png",
    13: "right_angle_270.png",
    14: "straight_0.png",
    15: "straight_90.png",
    16: "straight_180.png",
    17: "straight_270.png",
    18: "nt_0.png",
    19: "nt_90.png",
    20: "nt_180.png",
    21: "nt_270.png",
    22: "plus.png",
    23: "all.png"
}        

level_two = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,6,9,6,9,0,0,0],
    [0,0,3,19,23,21,5,0,0],
    [0,0,0,7,8,7,8,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
]

level_one = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,6,18,9,0,0,0],
    [0,0,0,19,23,21,0,0,0],
    [0,0,0,7,20,8,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
]

l_data = {}

level_four = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [4,18,2,0,23,0,4,18,2],
    [0,7,9,6,2,0,6,8,0],
    [0,0,19,8,0,6,21,0,0],
    [0,6,8,0,4,8,7,9,0],
    [4,20,2,0,0,0,4,20,2],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
]

for x_index, x in enumerate(level_one):
    for y_index, y in enumerate(x):
        if y>0:
            print(f'{y_index}-{x_index}={data[y]}')
            l_data[f'{y_index}-{x_index}'] = {
                "img": f'src/{data[y]}'
            }
print(l_data)

l = {
    1:level_one,
    2:level_two
}