export const headerCode = [`
import torch
import torch.nn as nn
import torchvision
import torchvision.transforms as transforms
import torch.nn.functional as F

class MyModel(nn.Module):
    def __init__(self):
        super(CNNFMnist, self).__init__()
        
		# Your code goes here
`,`
	def forward(self, x):`,

`	
    def num_flat_features(self, x):
        size = x.size()[1:]  # all dimensions except the batch dimension
        num_features = 1
        for s in size:
            num_features *= s
        return num_features
`];