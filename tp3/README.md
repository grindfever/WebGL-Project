# CG 2023/2024

## Group T08G04

## TP 3 Notes

- While creating the Prism, we had some difficulties creating the algorithm to create the vertices and creating the normals for each vertex

- We had difficulties on watching the effects light on the different components of the tangram because some of its pieces were interconnected

In the first exercise we created the normals for the figures we've done on previous TP's so that the calculated luminosity made sense according to the angle of incidence of the light and the viewing angle. We also created a material similar to wood with a low specular component.

### WoodCube

![WoodCube](screenshots/cg-t08g04-tp3-1.png)

Still in exercise 1, we applied several materials with a high specular component to the figures present in the tangram.

### Tangram

![Tangram](screenshots/cg-t08g04-tp3-2.png)

In exercise 2 we built a prism with a variable number of sides and complexity. The most challenging part was implementing the most efficient algorithm possible to create vertices, describe the triangle mesh and create normalized normals at each vertex. The calculated lighting was similar to that calculated with Constant Shading since the normals for the same face are the same.
